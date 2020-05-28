odoo.define('wcmq_web.basic_fields', function (require) {

    "use strict";

    var basic_fields = require('web.basic_fields');
    var datepicker = require('wcmq_web.datepicker');

    var field_registry = require('web.field_registry');
    var field_utils = require('wcmq_web.field_utils');

    var FieldYear = basic_fields.FieldDate.extend({
        supportedFieldTypes: ['date', 'integer', 'char'],
        init: function () {
            this._super.apply(this, arguments);

            this.datepickerOptions.format = 'YYYY';
            this.datepickerOptions.viewMode = 'years';
            this.datepickerOptions.fieldType = this.field.type;
        },
        _formatValue: function (value) {
            var options = _.extend(
                {},
                this.nodeOptions, {
                    data: this.recordData
                },
                this.formatOptions
            );
            return field_utils.format.year(value, this.field, options);
        },
        _isSameValue: function (value) {
            if (value === false) {
                return this.value === false;
            }
            if (this.field.type === 'date') {
                return value.isSame(this.value, 'year');
            }
            return this.value === value;
        },
        _makeDatePicker: function () {
            return new datepicker.YearWidget(this, this.datepickerOptions);
        },
        _parseValue: function (value) {
            var result = field_utils.parse.year(value, this.field, this.parseOptions);

            if (!result) {
                return result;
            }

            if (this.field.type === 'integer') {
                result = result.year();
            }

            return result;
        },
        _renderEdit: function () {
            this.datewidget.setValue(this.field.type !== 'integer' ? this.value : this.value.toString());
            this.$input = this.datewidget.$input;
        },
    });

    field_registry.add('year', FieldYear);

});
