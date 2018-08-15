from django.contrib.auth.models import User
from rest_framework import serializers

from tickets.models import Ticket, Project, Status, Tag

class UserSerializer(serializers.ModelSerializer):
    """Get user serializer.
    """
    
    class Meta:
        model = User
        fields = ['id', 'username']

class TagSerializer(serializers.ModelSerializer):
    """Tag serializer.
    """
    
    class Meta:
        model = Tag
        fields = ['title']

class TicketListSerializer(serializers.ModelSerializer):
    """Tag serializer to list down all tickets.
    """
    
    project = serializers.CharField(source='project.title')
    assignee = serializers.CharField(source='assignee.username')
    reporter = serializers.CharField(source='reporter.username')
    status = serializers.CharField(source='status.title')
    created = serializers.DateTimeField(format='%b %d, %Y')
    updated = serializers.DateTimeField(format='%b %d, %Y')
    tags = TagSerializer(many=True)

    class Meta:
        model = Ticket
        fields = [
            'title' , 'description',
            'project', 'assignee',
            'reporter', 'status',
            'created', 'updated',
            'tags'
        ]

class TicketCreateSerializer(serializers.ModelSerializer):
    """Create tag serializer.
    """
    tags = serializers.CharField(allow_blank=True)
    class Meta:
        model = Ticket
        fields = [
            'title', 'description',
            'project', 'assignee',
            'reporter', 'status',
            'tags'
        ]
    def create(self, validated_data):
        # tags are split with comma and create
        tags = validated_data.pop('tags', '')
        tags = [i.strip() for i in tags.split(',')]
        tag_objects = []
        for tag in tags:
            tag_objects.append(Tag.objects.get_or_create(**{'title': tag})[0])
        ticket = Ticket.objects.create(**validated_data)
        for tag_object in tag_objects:
            ticket.tags.add(tag_object)
        return ticket


class ProjectSerializer(serializers.ModelSerializer):
    """Projects serializer.
    """

    class Meta:
        model = Project
        fields = [
            'id', 'title',
        ]


class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = [
            'id', 'title'
        ]