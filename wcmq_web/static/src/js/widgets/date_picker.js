odoo.define('wcmq_web.datepicker', function (require) {

    "use strict";

    var datepicker = require('web.datepicker');
    var field_utils = require('wcmq_web.field_utils');

    var YearWidget = datepicker.DateWidget.extend({
        type_of_date: 'year',
        changeDatetime: function () {
            if (this.options.fieldType !== 'date' && this.isValid()) {
                var oldValue = this.getValue();
                this._setValueFromUi();
                var newValue = this.getValue();
                var hasChanged = !oldValue !== !newValue;
                if (oldValue && newValue) {
                    var formattedOldValue = moment(oldValue, 'Y');
                    var formattedNewValue = moment(newValue, 'Y');
                    if (formattedNewValue !== formattedOldValue) {
                        hasChanged = true;
                    }
                }
                if (hasChanged) {
                    this.trigger("datetime_changed");
                }
            } else {
                this._super.apply(this, arguments);
            }
        },
        getValue: function () {
            if (this.options.fieldType !== 'date') {
                return this.get('value');
            }
            return this._super.apply(this, arguments);
        },
        _formatClient: function (v) {
            return field_utils.format.year(v, this.parent, this.options);
        },
        _parseClient: function (v) {
            return field_utils.parse.year(v, this.parent, this.options);
        }
    });

    return {
        YearWidget: YearWidget
    }

});
