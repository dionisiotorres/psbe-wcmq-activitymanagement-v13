odoo.define('wcmq_web.field_utils', function (require) {

    "use strict";

    function formatYear(value, field, options) {
        if (value === false) {
            return "";
        }

        try {
            return value.format('Y');
        } catch {
            return value;
        }
    };

    function parseYear(value, field, options) {
        if (!value) {
            return false;
        }

        var date = moment.utc(value, ['Y', moment.ISO_8601], true);
        if (date.isValid()) {
            if (date.year() === 0) {
                date.year(moment.utc().year());
            }
            if (date.year() >= 1900) {
                date.toJSON = function () {
                    return this.clone().locale('en').format('YYYY-MM-DD');
                };
                return date;
            }
        }
        throw new Error(_.str.sprintf(core._t("'%s' is not a correct date"), value));
    }

    return {
        format: {
            year: formatYear
        },
        parse: {
            year: parseYear
        }
    };

});
