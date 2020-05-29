# -*- coding: utf-8 -*-

from odoo import http
from odoo.addons.wcmq_website_form.controllers.main import WCMQWebsiteForm
from odoo.addons.website_hr_recruitment.controllers.main import WebsiteHrRecruitment


class WCMQWebsiteHrRecruitment(WebsiteHrRecruitment, WCMQWebsiteForm):

    @http.route()
    def jobs_apply(self, job, **kwargs):

        response = super().jobs_apply(job, **kwargs)

        if response.is_qweb:
            response.qcontext['countries'] = self.get_countries()
            response.qcontext['edu_partners_by_country'] = self.get_edu_partners_by_country()

        return response
