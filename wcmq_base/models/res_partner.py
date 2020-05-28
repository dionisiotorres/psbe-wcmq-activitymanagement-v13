# -*- coding: utf-8 -*-

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError

class Partner(models.Model):

    _inherit = 'res.partner'

    # Partner name fields
    firstname = fields.Char(string='First name')
    middlename = fields.Char(string='Middle name')
    lastname = fields.Char(string='Last name')

    name = fields.Char(
        compute='_compute_name',
        inverse='_inverse_name',
        store=True
    )

    # Contact specific fields
    edu_partner_id = fields.Many2one(
        comodel_name='res.partner',
        string='School / University'
    )
    expected_graduation_year = fields.Integer()

    # School/University specific fields
    edu_validated = fields.Boolean(string='School validated')

    @api.constrains('expected_graduation_year')
    def _check_digits(self):
        """
        """

        for record in self:

            if (
                not record.expected_graduation_year or
                record.expected_graduation_year <= 9999
            ):
                continue

            raise ValidationError(_('You cannot add a year with more than 4 digits'))

    @api.depends(
        'is_company', 'type',
        'firstname', 'lastname', 'middlename'
    )
    def _compute_name(self):
        """
        """

        # NOTE: Creating a new record
        if len(self) == 1 and not self._origin:
            self.name = self._compute_fullname()
            return

        # NOTE: Updating existing records, two possibilities:
        #       1) Non contacts, fetch value from DB and set it on the record
        #       2) Contacts, compute value from 'parts'

        self.env.cr.execute("SELECT id, name FROM res_partner WHERE is_company = TRUE AND type != 'contact' AND id IN %s", (tuple(self.ids),))
        names = dict(self.env.cr.fetchall())
        non_contacts = self.browse(list(names))

        for partner in non_contacts:
            partner.name = names.get(partner._origin.id) or ''

        for record in self - non_contacts:
            record.name = record._compute_fullname()

    def _inverse_name(self):
        """
        """

        for rec in self:

            if not rec.is_company:
                continue

            rec.firstname = ''
            rec.lastname = ''

    def _compute_fullname(self, reverse=False):
        """
        """

        if self.is_company:

            company_name = self.name
            if not self.name and self._origin:
                company_name = self._origin.read(['name'])[0]['name']

            return company_name

        names = (self.firstname, self.middlename, self.lastname)
        if reverse:
            names = tuple(reversed(names))
        return ' '.join(n.strip() for n in names if n and n.strip())
