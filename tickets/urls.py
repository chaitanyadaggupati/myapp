from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from tickets.views import *


urlpatterns = format_suffix_patterns([
    url(r'api/tickets', TicketList.as_view(), name='list_create_tickets'),
    url(r'api/projects', ProjectList.as_view()),
    url(r'api/users', UserList.as_view()),
    url(r'api/reporter', Reporter.as_view()),
    url(r'api/status', StatusList.as_view()),
])