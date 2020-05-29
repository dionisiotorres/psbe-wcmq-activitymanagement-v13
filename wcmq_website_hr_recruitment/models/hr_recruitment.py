# -*- coding: utf-8 -*-

from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


TEAM_MEMBERS_GRADE_SELECTION = [
    ('1', 'Grade 1'),
    ('2', 'Grade 2'),
    ('3', 'Grade 3'),
    ('4', 'Grade 4')
]


class Applicant(models.Model):

    _inherit = 'hr.applicant'

    partner_firstname = fields.Char(string='First name')
    partner_middlename = fields.Char(string='Middle name')
    partner_lastname = fields.Char(string='Last name')

    edu_partner_country_id = fields.Many2one(comodel_name='res.country', string='School / University country')
    edu_partner_id = fields.Many2one(comodel_name='res.partner', string='School / University')

    qatari_citizen = fields.Boolean(string='Qatari citizen')
    mother_qatari_citizen = fields.Boolean(string='Mother Qatari citizen')
    mother_qatari_citizen_passport = fields.Binary(string='Mother\'s ID / Passport')

    expected_graduation_year = fields.Integer(string='Expected year of graduation')

    job_has_abstract_recruitment = fields.Boolean(related='job_id.has_abstract_submission', string='Display abstract submission on application')

    team_member_1_fullname = fields.Char(string='TM1 Fullname')
    team_member_1_grade = fields.Selection(selection=TEAM_MEMBERS_GRADE_SELECTION, string='TM1 Grade')
    team_member_1_phone = fields.Char(string='TM1 Phone number')
    team_member_1_email = fields.Char(string='TM1 Email')
    team_member_2_fullname = fields.Char(string='TM 2 Fullname')
    team_member_2_grade = fields.Selection(selection=TEAM_MEMBERS_GRADE_SELECTION, string='TM 2 Grade')
    team_member_2_phone = fields.Char(string='TM 2 Phone number')
    team_member_2_email = fields.Char(string='TM 2 Email')
    team_member_3_fullname = fields.Char(string='TM 3 Fullname')
    team_member_3_grade = fields.Selection(selection=TEAM_MEMBERS_GRADE_SELECTION, string='TM 3 Grade')
    team_member_3_phone = fields.Char(string='TM 3 Phone number')
    team_member_3_email = fields.Char(string='TM 3 Email')
    team_member_4_fullname = fields.Char(string='TM 4 Fullname')
    team_member_4_grade = fields.Selection(selection=TEAM_MEMBERS_GRADE_SELECTION, string='TM 4 Grade')
    team_member_4_phone = fields.Char(string='TM 4 Phone number')
    team_member_4_email = fields.Char(string='TM 4 Email')
    team_member_5_fullname = fields.Char(string='TM 5 Fullname')
    team_member_5_grade = fields.Selection(selection=TEAM_MEMBERS_GRADE_SELECTION, string='TM 5 Grade')
    team_member_5_phone = fields.Char(string='TM 5 Phone number')
    team_member_5_email = fields.Char(string='TM 5 Email')

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

    def website_form_input_filter(self, request, values):
        """
        """

        if (
            'partner_name' not in values and
            (
                'partner_firstname' in values and
                'partner_lastname' in values
            )
        ):
            names = (
                values['partner_firstname'],
                values.get('partner_middlename'),
                values['partner_lastname']
            )
            fullname = ' '.join(n.strip() for n in names if n and n.strip())
            values['partner_name'] = fullname

        return super().website_form_input_filter(request, values)


class Job(models.Model):

    _inherit = 'hr.job'

    has_abstract_submission = fields.Boolean(string='Display abstract submission on application')
