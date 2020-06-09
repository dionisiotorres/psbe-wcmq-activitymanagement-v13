odoo.define('wcmq_website_form.animation', function (require) {

    'use strict';

    var ajax = require('web.ajax');
    var core = require('web.core');
    var publicWidget = require('web.public.widget');

    var qweb = core.qweb;

    var form_builder_send = publicWidget.registry.form_builder_send
    form_builder_send.include({

        xmlDependencies: _.union(
            form_builder_send.prototype.xmlDependencies || [],
            ['/wcmq_website_form/static/src/xml/wcmq_website_form.xml']
        ),

        checkboxVisibilityCheckSelector: '.form-field[data-toggle="invisibility-checkbox"] .o_website_form_input[type="checkbox"]',

        willStart: function () {
            var self = this;

            this.eduPartnersByCountry = (odoo.wcmq_website_form || {}).edu_partners_by_country;

            var prom;
            if (!this.eduPartnersByCountry) {
                prom = ajax.jsonRpc('/website_form/get_edu_partners_data').then(function (result) {
                    var $eduPartnerCountrySelect = self.$target.find('select[name="edu_partner_country_id"]');
                    var t = _.template('<option value="<%- id %>"><%- name %></option>');
                    _.each(result[0], function (c) {
                        var $option = $(t(c))
                        $eduPartnerCountrySelect.append($option);
                    });
                    self.eduPartnersByCountry = result[1];
                });
            }

            this.$target.find('script#edu_partners_by_country').remove();

            return Promise.all([this._super.apply(this, arguments), prom]);
        },
        start: function (editable_mode) {

            var self = this;

            if (editable_mode) {
                return this._super.apply(this, arguments);
            }

            this.$submit = this.$target.find('.o_website_form_send');

            this.$checkEqualContentInputGroups = this.$target.find('*[data-check-input-content="equal"]')
            this.checkEqualContentInputs = [];

            _.each(this.$checkEqualContentInputGroups, function (group) {
                var $group = $(group);
                var $inputs = $group.find('input.o_website_form_input');

                var inputTypes = $.map($inputs, function (input) {
                    return $(input).prop('type');
                });

                var allEqual = _.every(inputTypes, function (item) { return item === inputTypes[0]; });
                if (allEqual) {
                    self.checkEqualContentInputs.push({
                        group: $group,
                        inputs: $inputs
                    });
                }
            });

            _.each(this.checkEqualContentInputs, function (item) {
                item.inputs.on(
                    'blur',
                    self._onModifyEqualContentInput.bind(self)
                );
            });

            this.$eduPartnersFormGroup = this.$target.find('select[name="edu_partner_country_id"]').parents('.form-group');
            this.$target.find('select[name="edu_partner_country_id"]').on(
                'change',
                this._onChangeEduPartnerCountry.bind(this)
            );

            this.$checkboxVisibilityCheckSelectors = this.$target.find(this.checkboxVisibilityCheckSelector);
            this.$checkboxVisibilityCheckSelectors.on('change', this._onChangeVisibilityCheckbox.bind(this));

            _.each(this.$checkboxVisibilityCheckSelectors, function (el) {
                $(el).triggerHandler('change');
            });

            return this._super.apply(this, arguments);
        },
        send: function (e) {
            var self = this;

            e.preventDefault();

            var allEqual = _.every(
                _.map(
                    self.checkEqualContentInputs,
                    function (item) {
                        return self._checkInputsContent(item.group);
                    }
                )
            );

            if (!allEqual) {
                this.update_status('invalid');
                return false;
            }

            return this._super.apply(this, arguments);
        },

        _checkInputsContent: function ($group) {

            if (!$group) {
                return true;
            }

            var $inputs = $group.find('.o_website_form_input');

            var inputValues = $.map($inputs, function (input) {
                return $(input).val();
            });

            if (inputValues.length !== _.compact(inputValues).length) {
                return true;
            }

            var allEqual = _.every(inputValues, function (item) { return item === inputValues[0]; })
            if (allEqual) {
                $inputs.removeClass('is-invalid');
                return true;
            } else {
                $inputs.addClass('is-invalid');
                return false;
            }
        },
        _disableSubmit: function () {
            this.$submit.attr('disabled', 'disabled');
        },
        _enableSubmit: function () {
            this.$submit.attr('disabled', false);
        },
        _showCountryEduPartners: function (countryData) {
            var $eduPartnerSelect = $(qweb.render(
                'WCMQ_website_form.eduPartnerSelect',
                countryData
            ));
            this.$eduPartnersFormGroup.append($eduPartnerSelect);
        },
        _showEduCountryFallback: function () {
            console.warn('NotImplemented');
        },

        _onChangeEduPartnerCountry: function (ev) {
            ev.stopPropagation();

            var $partnerSelect = this.$target.find('select[name="edu_partner_id"]')
            $partnerSelect.parents('.form-field').remove();

            var $countrySelect = this.$target.find('select[name="edu_partner_country_id"]')

            var selectedCountryID = parseInt($countrySelect.find('option:selected').val(), 10);
            var countryData = this.eduPartnersByCountry[selectedCountryID];

            if (!countryData) {
                this._showEduCountryFallback();
            } else {
                this._showCountryEduPartners(countryData);
            }
        },
        _onChangeVisibilityCheckbox: function (ev) {
            ev.stopPropagation();

            var $target = $(ev.currentTarget);
            var $targetParent = $target.parents('.form-field');
            var inverse = $targetParent.data('invisibility-check-inverse');
            var toggleTargetSelector = $targetParent.attr('href');
            var $toggleTarget = this.$target.find(toggleTargetSelector);

            var checked = function () {
                var isChecked = $target.is(':checked');
                return inverse ? !isChecked : isChecked;
            }();

            $toggleTarget.toggleClass('d-none', !checked);

            var required = $toggleTarget.data('invisibility-check-required');
            if (required) {
                $toggleTarget.toggleClass('o_website_form_required', !!checked);
                $toggleTarget.find('.o_website_form_input').attr('required', !!checked ? 'required' : false);
            }

            var checkToggleTarget = $toggleTarget.data('toggle') === 'invisibility-checkbox';
            if (!!checkToggleTarget && !checked) {
                var $toggleTargetCheckbox = $toggleTarget.find('.o_website_form_input[type="checkbox"]');
                $toggleTargetCheckbox.prop('checked', checked);
                $toggleTargetCheckbox.triggerHandler('change');
            }
        },
        _onModifyEqualContentInput: function (ev) {
            ev.stopPropagation();
            this._checkInputsContent($(ev.currentTarget).parents('.form-group'));
        }

    })

});
