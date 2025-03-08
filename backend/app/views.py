from functools import wraps
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from .models import *


def login_required(view):
    import firebase_admin
    from firebase_admin import auth, credentials
    creds = credentials.Certificate("researchify-service.json")
    app = firebase_admin.initialize_app(creds)

    @wraps(view)
    def wrapper(request, *args, **kwargs):
        try:
            idToken = request.headers.get("Authorization").split("Bearer ")[-1]
        except:
            return JsonResponse({"error": "Authorization header not found"}, status=401)
        try:
            user = app.verify_id_token(idToken)
        except:
            return JsonResponse({"error": "idToken is not valid"}, status=401)
        request.user = user
        return view(request, *args, **kwargs)
    return wrapper

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

class Chat(View):
    def get(self, request, *args, **kwargs):
        pass

    @method_decorator(login_required)
    def post(self, request, *args, **kwargs):
        print(request.user)
        return JsonResponse({"data": "hi"})