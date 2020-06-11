# -*- coding: utf-8 -*-
{
    'name': "wcmq_website_form",
    'description': """
WCM Qatar Website Form Customizations
=====================================

- Task 2244996: Website form specificities
- Task 2257929: Website form school case
    """,
    'version': '1.0',
    'author': "Odoo SA",
    'depends': ['wcmq_base', 'website_form'],
    'data': [
        'views/assets.xml',
        'views/website_form_templates.xml'
    ],
    'qweb': ['static/src/xml/wcmq_website_form.xml']
}
