odoo.define('wcmq_website_hr_recruitment.animation', function (require) {

    'use strict';

    require('wcmq_website_form.animation');

    var core = require('web.core');
    var publicWidget = require('web.public.widget');

    var qweb = core.qweb;

    var form_builder_send = publicWidget.registry.form_builder_send
    form_builder_send.include({

        xmlDependencies: _.union(
            publicWidget.registry.form_builder_send.prototype.xmlDependencies || [],
            ['/wcmq_website_hr_recruitment/static/src/xml/wcmq_website_hr_recruitment.xml']
        ),

        start: function (editable_mode) {

            if (editable_mode) {
                return this._super.apply(this, arguments);
            }

            this.$abstractSubmission = this.$target.find('.wcmq_abstract_submission');

            this.$target.find('.o_website_form_input[name="team_member_count"]').on(
                'change',
                this._onChangeTeamMemberCount.bind(this)
            );
            this.$target.find('.o_website_form_input[name="team_member_count"]').triggerHandler('change');

            return this._super.apply(this, arguments);

        },
        _onChangeTeamMemberCount: function (ev) {
            ev.stopPropagation();

            var self = this;

            this.$abstractSubmission.empty();

            var $target = $(ev.currentTarget);
            var count = parseInt($target.val(), 10);

            if ((count < 1) || !(count <= 5)) {
                count = 1
            }

            var fragments = []
            for (var i = count; i--; !(i < 1)) {
                var $fragment = $(qweb.render(
                    'WCMQ_website_hr_recruitment.abstractSubmissionTeamMember',
                    {index: i + 1 }
                ));
                fragments.unshift($fragment);
            }

            _.each(fragments, function (f) {
                self.$abstractSubmission.append(f);
            });
        }

    });

});
