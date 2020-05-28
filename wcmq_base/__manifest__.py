# -*- coding: utf-8 -*-
{
    'name': "wcmq_base",
    'description': """
WCM Qatar Base Customizations
=============================

- Task 2253751: Base fields on res.partner
    """,
    'version': '1.0',
    'author': 'Odoo SA',
    'depends': ['base'],
    'data': [
        'views/res_partner.xml'
    ],
    'pre_init_hook': 'pre_init'
}
