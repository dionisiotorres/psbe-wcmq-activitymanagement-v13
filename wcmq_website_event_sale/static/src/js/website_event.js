odoo.define('wcmq_website_event_sale.website_event', function (require) {

    'use strict';

    var time = require('web.time');
    var Widget = require('web.Widget');

    var EventRegistrationForm = require('website_event.website_event');

    EventRegistrationForm.include({
        on_click: function (ev) {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                var $modal = $('#modal_attendees_registration ');
                $modal.on('shown.bs.modal', function () {
                    (new WCMQAttendeeRegistrationForm(self)).attachTo($modal.find('form'));
                });
            });
        }
    });

    var WCMQAttendeeRegistrationForm = Widget.extend({

        start: function () {
            this.$('.o_website_form_date').datetimepicker({
                minDate: moment({ y: 1900 }),
                maxDate: moment({ y: 9999, M: 11, d: 31 }),
                calendarWeeks: true,
                icons: {
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar',
                    next: 'fa fa-chevron-right',
                    previous: 'fa fa-chevron-left',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                   },
                locale: moment.locale(),
                format: time.getLangDateFormat(),
                widgetPositioning: {
                    vertical: 'top'
                }
            });

            return this._super.apply(this, arguments);
        }
    })

});
