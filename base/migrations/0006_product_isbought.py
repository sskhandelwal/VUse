# Generated by Django 4.1.2 on 2022-11-09 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0005_alter_product_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="isBought",
            field=models.BooleanField(default=False),
        ),
    ]