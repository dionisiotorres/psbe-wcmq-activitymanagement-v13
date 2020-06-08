odoo.define('wcmq_website_event_sale.tour', function (require) {

    'use strict';

    require('website_event_sale.tour');

    var tour = require('web_tour.tour');

    var event_buy_tickets_tour = tour.tours.event_buy_tickets;

    event_buy_tickets_tour.steps = [{
        content: "Go to the `Events` page",
        trigger: 'a[href*="/event"]:contains("Conference for Architects"):first',
    }, {
        content: "Show available Tickets",
        trigger: '.o_wevent_registration_btn',
    }, {
        content: "Select 1 unit of `Standard` ticket type",
        extra_trigger: '#wrap:not(:has(a[href*="/event"]:contains("Conference for Architects")))',
        trigger: 'select:eq(0)',
        run: 'text 1',
    }, {
        content: "Click on `Order Now` button",
        extra_trigger: 'select:eq(1):has(option:contains(0):propSelected)',
        trigger: '.btn-primary:contains("Register")',
    }, {
        content: 'Fill attendees details',
        trigger: 'form[id="attendee_registration"] .btn:contains("Continue")',
        run: function () {
            $("input[name='1-firstname']").val("Att1 FN");
            $("input[name='1-lastname']").val("Att1 LN");
            $("input[name='1-mobile']").val("111 111");
            $("input[name='1-email']").val("att1@example.com");
        }
    }, {
        content: "Validate attendees details",
        // extra_trigger: "input[name='1-name'], input[name='2-name'], input[name='3-name']",
        trigger: 'button:contains("Continue")',
    }, {
        content: "Check that the cart contains exactly 1 triggers",
        trigger: 'a:has(.my_cart_quantity:containsExact(1)),.o_extra_menu_items .fa-plus',
        run: function () {}, // it's a check
    }, {
        content: "go to cart",
        trigger: 'a:contains(Return to Cart)',
    }, {
        content: "Now click on `Process Checkout`",
        extra_trigger: 'a:has(.my_cart_quantity):contains(1),#cart_products input.js_quantity[value="1"]',
        trigger: '.btn-primary:contains("Process Checkout")'
    }, {
        content: "Check that the subtotal is 1,000.00 USD", // this test will fail if the currency of the main company is not USD
        trigger: '#order_total_untaxed .oe_currency_value:contains("1,000.00")',
        run: function () {}, // it's a check
    }, {
        content: "Select `Wire Transfer` payment method",
        trigger: '#payment_method label:contains("Wire Transfer")',
    }, {
        content: "Pay",
        //Either there are multiple payment methods, and one is checked, either there is only one, and therefore there are no radio inputs
        extra_trigger: '#payment_method label:contains("Wire Transfer") input:checked,#payment_method:not(:has("input:radio:visible"))',
        trigger: 'button[id="o_payment_form_pay"]:visible',
    }, {
        content: "Last step",
        trigger: '.oe_website_sale:contains("Please make a payment to:")',
        timeout: 30000,
    }];

    // // NOTE: Remove step "Select 2 units of `VIP` ticket type"
    // event_buy_tickets_tour.steps.splice(3, 1);
    // event_buy_tickets_tour.steps.splice(4, 0, {
    //     content: 'Click on `Order Now` button',
    //     extra_trigger: 'select:eq(1):has(option:contains(0):propSelected)',
    //     trigger: '.btn-primary:contains("Register")'
    // });
    // event_buy_tickets_tour.steps.splice(5, 0, {
    //     content: 'Fill attendees details',
    //     trigger: 'form[id="attendee_registration"] .btn:contains("Continue")',
    //     run: function () {
    //         $("input[name='1-firstname']").val("Att1 FN");
    //         $("input[name='1-lastname']").val("Att1 LN");
    //         $("input[name='1-mobile']").val("111 111");
    //         $("input[name='1-email']").val("att1@example.com");
    //     }
    // });
    // event_buy_tickets_tour.steps.splice(6, 0, {
    //     content: 'Validate attendees details',
    //     extra_trigger: 'input[name="1-firstname"]',
    //     trigger: '.btn:contains("Continue")',
    // });

});
