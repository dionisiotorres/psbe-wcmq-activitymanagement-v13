# -*- coding: utf-8 -*-

from odoo import http
from odoo.http import request


class WCMQWebsiteForm(http.Controller):

    def _edu_partners_domain(self):
        """
        """

        return [
            ('country_id', '!=', False),
            ('is_company', '=', True),
            ('edu_validated', '=', True)
        ]

    def get_edu_partners_by_country(self):
        """
        """

        Partner = request.env['res.partner'].sudo()

        country_datas = Partner.read_group(
            self._edu_partners_domain(),
            ['id', 'name', 'country_id'],
            ['country_id'],
            lazy=False
        )

        result = {}

        for country_data in country_datas:

            if not country_data['__count']:
                continue

            country_data['country'] = (
                country_data['country_id'][0],
                str(country_data['country_id'][1])
            )
            country_data['country_id'] = country_data['country_id'][0]
            country_data['partners'] = [{
                'id': p['id'],
                'display_name': p['display_name']
            } for p in Partner.search_read(
                country_data['__domain'],
                ['display_name']
            )]

            country_data.pop('__count')
            country_data.pop('__domain')

            result[country_data['country_id']] = country_data

        return result

    def get_countries(self):
        """
        """

        return request.env['res.country'].search([])
