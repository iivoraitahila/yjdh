import datetime
import re

import pytest
from django.conf import settings
from django.test import override_settings
from django.urls import reverse

from oidc.tests.factories import OIDCProfileFactory


@pytest.mark.django_db
@override_settings(OIDC_OP_LOGOUT_ENDPOINT="http://example.com/logout/")
def test_logout_view(requests_mock, client, user):
    client.force_login(user)
    OIDCProfileFactory(user=user)

    matcher = re.compile(settings.OIDC_OP_LOGOUT_ENDPOINT)
    requests_mock.post(matcher)

    logout_url = reverse("oidc_logout")
    response = client.post(logout_url)

    assert response.url == settings.LOGOUT_REDIRECT_URL
    assert "_auth_user_id" not in client.session  # User not authenticated


@pytest.mark.django_db
@override_settings(OIDC_OP_LOGOUT_ENDPOINT="http://example.com/logout/")
def test_logout_view_without_oidc_profile(requests_mock, client, user):
    client.force_login(user)

    matcher = re.compile(settings.OIDC_OP_LOGOUT_ENDPOINT)
    requests_mock.post(matcher)

    logout_url = reverse("oidc_logout")
    response = client.post(logout_url)

    assert response.url == settings.LOGOUT_REDIRECT_URL
    assert "_auth_user_id" not in client.session  # User not authenticated


@pytest.mark.django_db
@override_settings(OIDC_OP_USER_ENDPOINT="http://example.com/userinfo/")
def test_userinfo_view(requests_mock, client, user):
    client.force_login(user)
    OIDCProfileFactory(
        user=user,
        refresh_token_expires=datetime.datetime.now() - datetime.timedelta(hours=1),
    )

    userinfo = {
        "sub": "82e17287-f34e-4e4b-b3d2-15857b3f952a",
        "national_id_num": "210281-9988",
        "name": "Nordea Demo",
        "preferred_username": "e29a380628e06d3e0e903b8fb245f1910bceee063cda47c27df1f976dc60aa9b",
        "given_name": "Nordea",
        "family_name": "Demo",
    }

    matcher = re.compile(settings.OIDC_OP_USER_ENDPOINT)
    requests_mock.get(matcher, json=userinfo)

    userinfo_url = reverse("oidc_userinfo")
    response = client.get(userinfo_url)

    assert response.json() == userinfo


@pytest.mark.django_db
@override_settings(OIDC_OP_USER_ENDPOINT="http://example.com/userinfo/")
def test_userinfo_view_without_oidc_profile(requests_mock, client, user):
    client.force_login(user)

    userinfo_url = reverse("oidc_userinfo")
    response = client.get(userinfo_url)

    assert response.status_code == 401


@pytest.mark.django_db
@override_settings(OIDC_OP_USER_ENDPOINT="http://example.com/userinfo/")
def test_userinfo_view_with_userinfo_returning_401(requests_mock, client, user):
    client.force_login(user)
    OIDCProfileFactory(
        user=user,
        refresh_token_expires=datetime.datetime.now() - datetime.timedelta(hours=1),
    )

    matcher = re.compile(settings.OIDC_OP_USER_ENDPOINT)
    requests_mock.get(matcher, status_code=401)

    userinfo_url = reverse("oidc_userinfo")
    response = client.get(userinfo_url)

    assert response.status_code == 401