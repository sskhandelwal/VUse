# Generated by Django 4.1.2 on 2022-11-28 18:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0009_product_bid_delete_auctionitem"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="bid",
            field=models.DecimalField(
                blank=True, decimal_places=2, default=0, max_digits=7, null=True
            ),
        ),
    ]
