import json
from functools import wraps
from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import *

import firebase_admin
from firebase_admin import auth, credentials

creds = credentials.Certificate("researchify-service.json")
app = firebase_admin.initialize_app(creds)


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


def login_required(view):
    @wraps(view)
    def wrapper(request, *args, **kwargs):
        try:
            idToken = request.headers.get("Authorization").split("Bearer ")[-1]
        except:
            return JsonResponse({"error": "Authorization header not found"}, status=401)
        user = auth.verify_id_token(idToken)
        try:
            user = auth.verify_id_token(idToken)
        except:
            return JsonResponse({"error": "idToken is not valid"}, status=401)
        request.user = user
        return view(request, *args, **kwargs)

    return wrapper


@method_decorator([csrf_exempt, login_required], name="dispatch")
class Chat(View):
    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        print(request.user)
        uid = request.user["uid"]
        user, created = User.objects.get_or_create(firebase_uid=uid)
        if created:
            user.name = request.user["name"]
            user.email = request.user["email"]
            user.save()

        body = json.loads(request.body)
        message = body["message"]

        UserChat.objects.create(user=user, text=message, is_user_message=True)
        llm_response = get_llm_response(message)
        UserChat.objects.create(user=user, text=llm_response, is_user_message=False)

        return JsonResponse({"message": llm_response})


def get_llm_response(prompt):
    return f"your message is {prompt}"
