from django.shortcuts import render
from django.http import JsonResponse
from .models import *

def get_groups(request):
    groups = Group.objects.all()
    response_data = [group.to_json() for group in groups]
    return JsonResponse({"data": response_data})