from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class AbstractBase(models.Model):
    """Abstract base model.
    """

    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Project(AbstractBase):
    """Project details.
    """
    contributors = models.ForeignKey(User, related_name='project')

    def __unicode__(self):
        return self.title


class Status(AbstractBase):
    """Statsus of the tickets.
    """

    def __unicode__(self):
        return self.title


class Tag(AbstractBase):
    """Tags
    """

    def __unicode__(self):
        return self.title


class Ticket(AbstractBase):
    """Ticket details.
    """

    project = models.ForeignKey(Project, db_index=True)
    assignee = models.ForeignKey(User, related_name='tickets_assignees' ,db_index=True)
    reporter = models.ForeignKey(User, related_name='tickets_reporters', db_index=True)
    status = models.ForeignKey(Status, db_index=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='tickets_tags', db_index=True)

    def __unicode__(self):
        return self.title
    
    class Meta:
        verbose_name = "Ticket"
        verbose_name_plural = "Tickets"
        
