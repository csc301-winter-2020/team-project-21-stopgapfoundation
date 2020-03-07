from django.db import models

class PhoneNumberField(models.Field, Importable):
    description = "A phone number field"

    def __init__(self, *args, **kwargs):
        self_max_length = 15
        super().__init__(*args, **kwargs)
    
    def db_type(self, connection):
        return 'char(%s)' % self.max_length
