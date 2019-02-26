from django.db import models
from sleepweb.institution.models import Institution


class User(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    name = models.CharField(db_column='name', max_length=255, null=False)
    email = models.CharField(db_column='email', max_length=255, null=False)
    password = models.CharField(db_column='password', max_length=255, null=False)
    institution = models.ForeignKey(Institution, on_delete=None, null=True, blank=True)

    class Meta:
        db_table = 'User'
        managed = True
        verbose_name = 'Users'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.name
