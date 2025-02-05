import factory.random
import pytest
from django.contrib.auth.models import Permission
from freezegun import freeze_time
from rest_framework.test import APIClient
from users.tests.factories import UserFactory


@pytest.fixture(autouse=True)
def setup_test_environment(settings):
    factory.random.reseed_random("777")
    with freeze_time("2021-06-04"):
        yield


@pytest.fixture
def user():
    return UserFactory()


@pytest.fixture
def api_client(user):
    permissions = Permission.objects.all()
    user.user_permissions.set(permissions)
    client = APIClient()
    client.force_authenticate(user)
    return client
