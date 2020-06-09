# -*- coding: utf-8 -*-
{
    'name': 'wcmq_website_sale',
    'description': """
WCM Qatar eCommerce Customizations
==================================

- Task 2244996
""",
    'depends': ['wcmq_website_form', 'website_sale'],
    'data': [
        'data/whitelist_res_partner_fields.xml',
        'views/assets.xml'
    ],
    'qweb': ['static/src/xml/website_sale_form.xml']
}
