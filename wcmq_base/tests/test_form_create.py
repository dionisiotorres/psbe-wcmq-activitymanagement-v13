# -*- coding: utf-8 -*-

import unittest

from odoo.exceptions import ValidationError
from odoo.tests import tagged, Form, TransactionCase
from odoo.addons.base.tests.test_form_create import TestFormCreate


@unittest.skip('[SKIP] Task 2253751')
def test_create_res_partner(self):
    pass

TestFormCreate.test_create_res_partner = test_create_res_partner


@tagged('-at_install', 'post_install')
class WCMQTestFormCreate(TransactionCase):

    def test_create_res_partner_company(self):
        partner_form = Form(self.env['res.partner'])
        partner_form.is_company = True
        partner_form.name = 'a partner'
        partner_form.save()

    def test_create_res_partner_contact(self):
        partner_form = Form(self.env['res.partner'])
        partner_form.is_company = False
        partner_form.firstname = 'a'
        partner_form.lastname = 'parnter'
        partner_form.save()

        with self.assertRaises(ValidationError):
            partner_form.expected_graduation_year = 20021
            partner_form.save()

        partner_form.expected_graduation_year = 2021
        partner_form.save()
