from django.urls import path
from . import views

urlpatterns = [
    path("groups", views.get_groups),
    path("tasks", views.get_tasks),
    path("escalations", views.get_escalations),
    path("chats", views.Chat.as_view()),
]
