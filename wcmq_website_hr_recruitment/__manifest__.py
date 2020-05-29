# -*- coding: utf-8 -*-
{
    'name': "wcmq_website_hr_recruitment",
    'description': """
WCM Qatar Website HR Recruitment Customizations
===============================================

- Task 2244996: Website form specificities
    """,
    'version': '1.0',
    'author': "Odoo SA",
    'depends': ['wcmq_website_form', 'website_hr_recruitment'],
    'data': [
        'data/whitelist_hr_applicant_fields.xml',
        'views/hr_job.xml',
        'views/hr_recruitment.xml',
        'views/assets.xml',
        'views/website_hr_recruitment_templates.xml'
    ],
    'demo': [
        'demo/website_hr_recruitment_templates.xml'
    ]
}
