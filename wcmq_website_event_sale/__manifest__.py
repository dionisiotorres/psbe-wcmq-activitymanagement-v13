# -*- coding: utf-8 -*-
{
    'name': "wcmq_website_event_sale",
    'description': """
WCM Qatar Website Event Sale Customizations
===========================================

- Task 2252066: Event Registration Form
    """,
    'version': "1.0",
    'author': "Odoo S.A.",
    'depends': ['wcmq_base', 'website_event_sale'],
    'data': [
        'views/event_sale.xml',
        'views/assets.xml',
        'views/website_event_templates.xml'
    ]
}
