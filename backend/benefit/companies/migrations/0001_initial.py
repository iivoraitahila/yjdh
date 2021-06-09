# Generated by Django 3.2 on 2021-06-09 08:28

import uuid

import localflavor.generic.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Company",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=256, verbose_name="name")),
                (
                    "business_id",
                    models.CharField(max_length=64, verbose_name="business id"),
                ),
                (
                    "company_form",
                    models.CharField(max_length=64, verbose_name="company form"),
                ),
                (
                    "street_address",
                    models.CharField(max_length=256, verbose_name="street address"),
                ),
                ("postcode", models.CharField(max_length=256, verbose_name="postcode")),
                ("city", models.CharField(max_length=256, verbose_name="city")),
                (
                    "bank_account_number",
                    localflavor.generic.models.IBANField(
                        include_countries=("FI",),
                        max_length=34,
                        use_nordea_extensions=False,
                        verbose_name="bank account number",
                    ),
                ),
            ],
            options={
                "verbose_name": "company",
                "verbose_name_plural": "companies",
                "db_table": "bf_companies_company",
            },
        ),
    ]