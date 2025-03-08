import json
from django.core.management.base import BaseCommand
from app.models import User, Group, Task, Escalation
from django.utils import timezone


class Command(BaseCommand):
    help = "Loads static data for user, group, task, and escalation models"

    def handle(self, *args, **kwargs):
        # groups data
        groups_data = [
            {
                "name": "Sales",
                "icon": "https://picsum.photos/id/59/50/50",
                "user_count": 9,
            },
            {
                "name": "Tech",
                "icon": "https://picsum.photos/id/0/200/300",
                "user_count": 15,
            },
            {
                "name": "Design",
                "icon": "https://picsum.photos/id/82/200/300",
                "user_count": 16,
            },
        ]

        for group_data in groups_data:
            Group.objects.create(**group_data)
        self.stdout.write(self.style.SUCCESS("loaded group data"))

        # create random user
        user1, created = User.objects.get_or_create(
            firebase_uid="Animesh29034234",
            name="Animesh",
            photo="https://picsum.photos/id/12/200/300",
            email="mail@example.com"
        )
        user2, created = User.objects.get_or_create(
            firebase_uid="Sagar2525213",
            name="Sagar Sk",
            photo="https://picsum.photos/id/13/200/300",
            email="mail@example.com"
        )
        user3, created = User.objects.get_or_create(
            firebase_uid="random23452",
            name="green",
            photo="https://picsum.photos/id/17/200/300",
            email="mail@example.com"
        )

        # tasks data
        tasks_data = [
            {"title": "Finish the UI and ask Animesh", "is_important": False},
            {"title": "Fix bugs 🔥", "is_important": True, "assigned_to": [user1, user2]},
            {"title": "Test the dev release to make 🧊", "is_important": False},
            {"title": "Code is messed up, catch cant catch the error", "is_important": True, "assigned_to": [user3]},
        ]

        for task_data in tasks_data:
            task = Task.objects.create(
                title=task_data["title"], is_important=task_data["is_important"]
            )
            if task_data.get("assigned_to"):
                for user in task_data["assigned_to"]:
                    task.assigned_to.add(user)
        self.stdout.write(self.style.SUCCESS("loaded tasks data"))


        escalations_data = [
            {"title": "There is an issue with this", "subtitle": "Alpha", "created_by": user1},
            {"title": "There is an issue with that", "subtitle": "Beta", "created_by": user3},
            {"title": "X is not working", "subtitle": "Sigma", "created_by": user3},
        ]

        for escalation_data in escalations_data:
            Escalation.objects.create(
                title=escalation_data["title"],
                subtitle=escalation_data["subtitle"],
                created_by=user,
            )
        self.stdout.write(self.style.SUCCESS("loaded escalation data"))
