# Generated by Django 4.1.2 on 2022-10-27 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_product_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="location",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]