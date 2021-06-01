from django.db import models
from django.utils.translation import gettext_lazy as _

from oidc.models import AbstractCompany


class Company(AbstractCompany):
    name = models.CharField(max_length=256, verbose_name=_("name"))
    business_id = models.CharField(max_length=64, verbose_name=_("business id"))
    company_form = models.CharField(max_length=64, verbose_name=_("company form"))
    industry = models.CharField(max_length=256, verbose_name=_("industry"))

    street_address = models.CharField(max_length=256, verbose_name=_("street address"))
    postcode = models.CharField(max_length=256, verbose_name=_("postcode"))
    city = models.CharField(max_length=256, verbose_name=_("city"))

    ytj_json = models.JSONField(blank=True, null=True, verbose_name=_("ytj json"))