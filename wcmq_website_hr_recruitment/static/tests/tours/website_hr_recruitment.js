odoo.define('wcmq_website_hr_recruitment.tour', function(require) {

    "use strict";

    var tour = require('web_tour.tour');

    tour.register('wcmq_website_hr_recruitment_tour', {
        test: true,
        url: '/jobs/apply/3'
    }, [{
        content: "Complete first name",
        trigger: "input[name=partner_firstname]",
        run: "text John"
    }, {
        content: "Complete last name",
        trigger: "input[name=partner_lastname]",
        run: "text Smith"
    }, {
        content: "Complete email",
        trigger: "input[name=partner_email]",
        run: "text john@smith.com"
    }, {
        content: "Complete confirm email",
        trigger: "input[name=confirm_partner_email]",
        run: "text john@smith.com"
    }, {
        content: "Select school / university country",
        trigger: "select[name=edu_partner_country_id]",
        run: function () {
            this.$consumeEventAnchor.val(233);
            this.$consumeEventAnchor.triggerHandler('change');
        }
    }, {
        content: "Select school / university",
        trigger: "select[name=edu_partner_id]",
        run: function () {
            this.$consumeEventAnchor.val(1);
        }
    }, {
        content: "Send the form",
        trigger: ".o_website_form_send"
    }, {
        content: "Check the form is submited without errors",
        trigger: ".oe_structure:has(h1:contains('Congratulations'))"
    }]);

});
