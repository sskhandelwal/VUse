# Generated by Django 4.1.2 on 2022-12-06 07:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0021_remove_product_milliseconds_remove_product_when_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="hours",
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]