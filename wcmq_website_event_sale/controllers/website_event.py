# -*- coding: utf-8 -*-

import datetime

from odoo.http import request
from odoo.addons.website_event_sale.controllers.main import WebsiteEventSaleController


class WCMQWebsiteEventSale(WebsiteEventSaleController):

    def _process_tickets_details(self, data):
        """
        """

        Ticket = request.env['event.event.ticket']

        result = super()._process_tickets_details(data)

        for ticket_data in result:
            ticket = Ticket.browse(ticket_data['id'])
            ticket_data['ticket_type'] = ticket.ticket_type

        return result

    def _process_registration_details(self, details):
        """
        """

        lang = request.env['ir.qweb.field'].user_lang()

        for key, value in details.items():

            counter, field_name = key.split('-', 1)
            if field_name != 'birthdate':
                continue

            details[key] = datetime.datetime.strptime(value, lang.date_format)

        return super()._process_registration_details(details)

