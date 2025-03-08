from django.db import models

class User(models.Model):
    firebase_uid = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=64)
    photo = models.URLField()
    email = models.EmailField()
    message_count = models.IntegerField(default=17) # for simplicity
    notification_count = models.IntegerField(default=37) # for simplicity
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    icon = models.URLField()
    user_count = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name

class Task(models.Model):
    title = models.CharField(max_length=256)
    is_important= models.BooleanField(default=False)
    assigned_to = models.ManyToManyField(User)
    
    def __str__(self):
        return self.title

class Escalation(models.Model):
    title = models.CharField(max_length=256)
    subtitle = models.CharField(max_length=32)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_escalations')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title