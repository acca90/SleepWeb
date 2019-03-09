from django.db import models


# Create your models here.
class Institution(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    name = models.CharField(db_column='name', max_length=255, null=False)
    country = models.CharField(db_column='country', max_length=255, null=False)

    class Meta:
        db_table = 'Institution'
        managed = True
        verbose_name = 'Institutions'
        verbose_name_plural = 'Institutions'

    def __str__(self):
        return self.name
