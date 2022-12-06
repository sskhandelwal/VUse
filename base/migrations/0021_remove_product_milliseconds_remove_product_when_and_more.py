# Generated by Django 4.1.2 on 2022-12-06 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0020_alter_product_milliseconds_alter_product_when"),
    ]

    operations = [
        migrations.RemoveField(model_name="product", name="milliseconds",),
        migrations.RemoveField(model_name="product", name="when",),
        migrations.AddField(
            model_name="product",
            name="hours",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
