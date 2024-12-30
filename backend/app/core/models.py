from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from datetime import datetime


class UserManager(BaseUserManager):
    """Create the user manager for the user"""
    def create_user(self, email, password=None,**extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
            **extra_fields
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email, password):
        user = self.create_user(
            email=email,
            password=password,
        )
        user.is_superuser= True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser,PermissionsMixin):
    """Define the user"""
    username = models.CharField(max_length=30,unique=True)
    email = models.EmailField(unique=True)
    create_at = models.DateTimeField(auto_now_add=True)
    password = models.CharField(max_length=300) 
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    image = models.ImageField(null=True,blank=True)

    
    USERNAME_FIELD="email" # the field that is used for the auth .
    objects = UserManager()
    
    def __str__(self):
        return self.username
    
            
class Child(models.Model):
    """Define the child model"""
    name = models.CharField(max_length=20)
    parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="children",null=True,blank=True)
    token = models.CharField(max_length=50, null=False, blank=False)
    image = models.ImageField(null=True,blank=True)
    
    class Meta:
        unique_together = ('parent', 'name')  # Ensure parent + name is unique
    
    def __str__(self):
        return f"{self.name} p => {self.parent}"
    
    
    
class Draw(models.Model):
    """The draw model"""
    name = models.CharField(max_length=30)
    draw_content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)
    is_locked = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    child = models.ForeignKey(
        Child,
        on_delete=models.CASCADE,
        related_name="draw"
    )
    
    class Meta:
        unique_together = ("name", "child")
    
    def __str__(self):
            return self.name