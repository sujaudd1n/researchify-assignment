from django.shortcuts import render
from django.http import JsonResponse
from .models import *

def get_objects(model):
    objects = model.objects.all()
    response_data = [obj.to_json() for obj in objects]
    return response_data

def get_groups(request):
    # groups = Group.objects.all()
    # response_data = [group.to_json() for group in groups]
    return JsonResponse({"data": get_objects(Group)})

def get_tasks(request):
    # tasks = Task.objects.all()
    # response_data = [task.to_json() for task in tasks]
    # return JsonResponse({"data": response_data})
    return JsonResponse({"data": get_objects(Task)})

def get_escalations(request):
    return JsonResponse({"data": get_objects(Escalation)})