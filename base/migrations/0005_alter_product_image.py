# Generated by Django 4.1.2 on 2022-11-08 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0004_product_email"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, default="/placeholder.png", null=True, upload_to=""
            ),
        ),
    ]