# -*- coding: utf-8 -*-

from . import models


def pre_init(cr):

    cr.execute("""
        ALTER TABLE res_partner
         ADD COLUMN firstname varchar,
         ADD COLUMN lastname varchar
    """)

    cr.execute("""
        UPDATE res_partner
           SET firstname = SUBSTRING(name, 1, STRPOS(name, ' ')),
               lastname = SUBSTRING(name, STRPOS(name, ' ') + 1, LENGTH(name) - STRPOS(name, ' '))
         WHERE is_company = FALSE AND type = 'contact'
    """)
