# -*- coding: utf-8 -*-

from odoo import models


class Http(models.AbstractModel):

    _inherit = 'ir.http'

    @classmethod
    def _get_translation_frontend_modules_name(cls):
        result = super()._get_translation_frontend_modules_name()
        return result + ['wcmq_website_form']
