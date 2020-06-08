# -*- coding: utf-8 -*-

from odoo import fields, models


class EventTicket(models.Model):

    _inherit = 'event.event.ticket'

    ticket_type = fields.Selection(
        selection=[
            ('student', 'Student'),
            ('student_presenter', 'Student Presenter'),
            ('school_representative', 'School Representative'),
            ('public', 'Public')
        ],
        string='Ticket type'
    )


class EventRegistration(models.Model):

    _inherit = 'event.registration'

    firstname = fields.Char(string='Attendee firstname')
    lastname = fields.Char(string='Attendee lastname')
    gender = fields.Selection(
        selection=[
            ('male', 'Male'),
            ('female', 'Female')
        ],
        string='Gender'
    )
    birth_county_id = fields.Many2one(
        comodel_name='res.country',
        string='Country of birth'
    )
    residence_country_id = fields.Many2one(
        comodel_name='res.country',
        string='Country of residence'
    )
    birthdate = fields.Date(string='Birthdate')
    edu_partner_id = fields.Many2one(
        comodel_name='res.partner',
        domain=[
            ('is_company', '=', True),
            ('edu_validated', '=', True)
        ],
        string='School / University'
    )
    expected_graduation_year = fields.Integer()
    profession = fields.Char()
    poster_topic = fields.Char(string='Topic of the poster')
