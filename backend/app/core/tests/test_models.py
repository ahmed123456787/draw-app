from django.test import TestCase
from django.contrib.auth import get_user_model
from core.models import *
from user.token_hashing import generate_token_from_name #Create the token .
from django.contrib.auth.models import UserManager

class ModelTest (TestCase):
    """Test creating the mdoels"""
    
    def test_create_user_with_email(self) :
        """testig creatinf a user with an email successful"""
        
        email = "test@example.com"
        password= "test1"
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )
        self.assertEqual(user.email,email)
        self.assertTrue(user.check_password(password))
        
    def test_create_child(self): 
        """Test creating a new child"""
        user = get_user_model().objects.create_user(
            email="def@gmail.com",
            password="def123"
        )
        child_name = "jalil"
        token = generate_token_from_name(child_name,user.username)
        new_child = Child.objects.create(name=child_name,parent=user,token=token)
        
        # retreive the child from db
        self.assertEqual(len(Child.objects.all()),1)
        self.assertEqual(Child.objects.first().name,child_name)
        
    def test_create_draw (self):
        """Test creating new draw"""
        
        user = get_user_model().objects.create_user(
            email="def@gmail.com",
            password="def123"
        )
        
        # create new child .
        child_name = "jalil"
        token = generate_token_from_name(child_name,user.username)
        new_child = Child.objects.create(name=child_name,parent=user,token=token)
        
        draw = Draw.objects.create(
        name="monaliza",
        draw_content={"def": "1"},
        child=new_child
    )
        self.assertEqual(len(Draw.objects.all()),1)
    
    def test_super_user(self):
        """Test creating super user"""
        super_user = get_user_model().objects.create_superuser(
            email="admin@gmail.com"
            ,password="admin123",
        )
        self.assertTrue(super_user.is_staff)
        self.assertTrue(super_user.is_superuser)