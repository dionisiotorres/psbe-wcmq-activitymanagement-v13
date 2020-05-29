# -*- coding: utf-8 -*-

import odoo.tests


@odoo.tests.tagged('post_install', '-at_install')
class TestWCMQWebsiteHrRecruitmentForm(odoo.tests.HttpCase):

    def test_tour(self):

        self.start_tour("/", 'wcmq_website_hr_recruitment_tour')

        # check result
        record = self.env['hr.applicant'].search([
            ('job_id', '=', 3),
            ('partner_firstname', '=', 'John'),
            ('partner_lastname', '=', 'Smith')
        ])

        self.assertEqual(len(record), 1)
        self.assertEqual(record.partner_name, "John Smith")
        self.assertEqual(record.email_from, "john@smith.com")

        self.assertTrue(record.qatari_citizen)
