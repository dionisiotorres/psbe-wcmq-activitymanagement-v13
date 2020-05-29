# -*- coding: utf-8 -*-

import unittest

from . import test_website_hr_recruitment
from odoo.addons.website_hr_recruitment.tests.test_website_hr_recruitment import TestWebsiteHrRecruitmentForm


@unittest.skip('Overriden')
def test_tour(self):
    pass

TestWebsiteHrRecruitmentForm.test_tour = test_tour
