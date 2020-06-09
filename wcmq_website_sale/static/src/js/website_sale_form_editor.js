odoo.define('wcmq_website_sale.form', function (require) {

    'use strict';

    require('website_sale.form');

    var ajax = require('web.ajax')
    var core = require('web.core');

    var def = ajax.loadXML(
        '/wcmq_website_form/static/src/xml/wcmq_website_form.xml',
        core.qweb
    );

    var FormEditorRegistry = require('website_form.form_editor_registry');

    FormEditorRegistry.map.create_customer = {
        defaultTemplateName: 'WCMQ_website_sale.defaultCustomerForm',
        defaultTemplatePath: '/wcmq_website_sale/static/src/xml/wcmq_website_sale_form.xml'
    };

    return def;

});
