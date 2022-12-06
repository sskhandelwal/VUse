import django
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timezone
# Create your models here.

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png') 
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places = 2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    isBought = models.BooleanField(default=False)
    boughtBy = models.IntegerField(default = 0, null = True, blank = True)
    bid = models.DecimalField(default = 0, max_digits=7, decimal_places = 2, null=True, blank=True)
    isAuction = models.BooleanField(default=False)
    hours = models.BigIntegerField(null=True, blank=True)
    endDate = models.DateTimeField(default = datetime.now(timezone.utc))
    
    # milliseconds = models.BigIntegerField(default = 4)

    def __str__(self):
        return self.name
