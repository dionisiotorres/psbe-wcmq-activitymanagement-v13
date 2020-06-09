# -*- coding: utf-8 -*-

from odoo import models


class Partner(models.Model):

    _inherit = 'res.partner'

    def website_form_input_filter(self, request, values):
        """
        """

        values.pop('confirm_partner_email', None)
        values['email'] = request.params.pop('partner_email', None)

        if (
            'name' not in values and
            (
                'partner_firstname' in request.params and
                'partner_lastname' in request.params
            )
        ):

            firstname = request.params.pop('partner_firstname')
            middlename = request.params.pop('partner_middlename', '')
            lastname = request.params.pop('partner_lastname')

            name = ' '.join(n.strip() for n in [firstname, middlename, lastname] if n and n.strip())

            values.update({
                'name': name,
                'firstname': firstname,
                'middlename': middlename,
                'lastname': lastname
            })

        return super().website_form_input_filter(request, values)
