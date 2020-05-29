# -*- coding: utf-8 -*-

from odoo.addons.website_form.controllers.main import WebsiteForm


class WCMQWebsiteForm(WebsiteForm):

    def extract_data(self, model, values):
        """
        """

        if model.sudo().model != 'hr.applicant':
            return super().extract_data(model, values)

        values.pop('confirm_partner_email', None)
        if 'email_from' not in values:
            values['email_from'] = values.pop('partner_email', None)

        return super().extract_data(model, values)
