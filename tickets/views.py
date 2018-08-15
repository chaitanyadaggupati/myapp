from django.shortcuts import render

from rest_framework import generics

from tickets.models import Ticket, Project, Status, Tag
from tickets.serializers import *

class TicketList(generics.ListCreateAPIView):
    """View for show tickets and create.
    """
    queryset = Ticket.objects.all()

    def get_serializer_class(self):
        if self.request.method=='GET':
            return TicketListSerializer
        elif self.request.method=='POST':
            return TicketCreateSerializer

class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Reporter(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        return User.objects.filter(pk=user_id)

class StatusList(generics.ListAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer