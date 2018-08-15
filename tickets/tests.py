from django.urls import reverse
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from tickets.models import *


class TicketTestCase(APITestCase):


    def setUp(self):
        self.user = User.objects.create_superuser('test', 'test@example.com', '123')
        self.project = Project.objects.create(**{'title': 'test', 'contributors': self.user})
        self.status = Status.objects.create(**{'title': 'open'})
        self.token = Token.objects.create(**{'user': self.user})


    def test_create_ticket(self):
        kwargs={
            'title': 'test',
            'project': self.project.id,
            'assignee': self.user.id,
            'reporter': self.user.id,
            'status': self.status.id,
            'tags': 'test-tag',

        }
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(reverse('list_create_tickets'), kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_ticket(self):
        response = self.client.get(reverse('list_create_tickets'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
        

        