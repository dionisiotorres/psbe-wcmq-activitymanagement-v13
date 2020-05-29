# -*- coding: utf-8 -*-
{
    'name': "wcmq_website_form",
    'description': """
WCM Qatar Website Form Customizations
=====================================

- Task 2244996: Website form specificities
    """,
    'version': '1.0',
    'author': "Odoo SA",
    'depends': ['website_form'],
    'data': [
        'views/assets.xml',
        'views/website_form_templates.xml'
    ],
    'qweb': ['static/src/xml/wcmq_website_form.xml']
}
