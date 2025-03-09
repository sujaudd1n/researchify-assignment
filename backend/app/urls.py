from django.urls import path
from . import views

urlpatterns = [
    path("groups", views.get_groups),
    path("tasks", views.get_tasks),
    path("escalations", views.get_escalations),
    path("chats", views.Chat.as_view()),
    path("user-info", views.user_info), # a random user's data will be sent to simulate a real user
]
