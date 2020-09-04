from django.db import models

class Restricted(models.Model):
    name = models.CharField(max_length=255,blank=True,null=True)
    descriptio = models.CharField(max_length=255,blank=True,null=True,verbose_name="description")
    
    def __str__(self):
        return self.name