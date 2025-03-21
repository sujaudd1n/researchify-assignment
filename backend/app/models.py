from django.db import models


class User(models.Model):
    firebase_uid = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=64)
    photo = models.URLField()
    email = models.EmailField()
    message_count = models.IntegerField(default=17)  # for simplicity
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def to_json(self):
        return {
            "name": self.name,
            "photoURL": self.photo,
            "message_count": self.message_count,
        }

    def to_json_with_mentions(self):
        return {
            "name": self.name,
            "photoURL": self.photo,
            "message_count": self.message_count,
            "mentions": [mention.to_json() for mention in Mention.objects.all()] # just a simulation
        }



    def to_self_json(self):
        return {
            "name": self.name,
            "photoURL": self.photo,
        }



class Mention(models.Model):
    mentioned = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="mentioned"
    )
    mentioned_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="mentioned_by"
    )

    def __str__(self):
        return self.mentioned
    
    def to_json(self):
        return {
            "mentioned": self.mentioned.to_self_json(),
            "mentioned_by": self.mentioned_by.to_self_json(),
        }


class Group(models.Model):
    name = models.CharField(max_length=128)
    icon = models.URLField()
    user_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def to_json(self):
        return {"name": self.name, "icon": self.icon, "user_count": self.user_count}


class Task(models.Model):
    title = models.CharField(max_length=256)
    is_important = models.BooleanField(default=False)
    assigned_to = models.ManyToManyField(User)

    def __str__(self):
        return self.title

    def to_json(self):
        return {
            "title": self.title,
            "is_important": self.is_important,
            "assigned_to": [user.to_json() for user in self.assigned_to.all()],
        }


class Escalation(models.Model):
    title = models.CharField(max_length=256)
    subtitle = models.CharField(max_length=32)
    is_important = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_escalations"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def to_json(self):
        return {
            "title": self.title,
            "subtitle": self.subtitle,
            "is_important": self.is_important,
            "created_by": self.created_by.to_json(),
        }


class UserChat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    is_user_message = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.text}"

    def to_json(self):
        return {
            "text": self.text,
            "is_user_message": self.is_user_message,
            "timestamp": self.timestamp,
        }
