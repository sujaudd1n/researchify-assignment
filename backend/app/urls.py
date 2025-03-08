from django.urls import path
from . import views

urlpatterns = [
    path("groups", views.get_groups),
    path("tasks", views.get_tasks)
]
