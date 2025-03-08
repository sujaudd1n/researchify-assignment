from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from .models import *

def get_objects(model):
    objects = model.objects.all()
    response_data = [obj.to_json() for obj in objects]
    return response_data

def get_groups(request):
    return JsonResponse({"data": get_objects(Group)})

def get_tasks(request):
    return JsonResponse({"data": get_objects(Task)})

def get_escalations(request):
    return JsonResponse({"data": get_objects(Escalation)})

class Chat(Views):
    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        pass