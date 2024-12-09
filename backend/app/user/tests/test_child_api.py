from django.test import TestCase
from rest_framework.test import APIClient
from core.models import *
from user.token_hashing import generate_token_from_name
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status


def create_user(**params):
    """create a helper user"""
    return get_user_model().objects.create(**params)


class PrivateChildTest(TestCase):
    """Test the child actions"""
    
    def setUp(self):
        self.client = APIClient()
        
    def test_child_register(self):
            """Test the register for the child"""
            parent  = create_user(
                email="admin@gmail.com",
                password="def123",
                username="def"
            )
            
            name = "jalil"
            token = generate_token_from_name(name,parent.username) 
            child = Child.objects.create(name=name,parent=parent,token=token)
            res = self.client.post(reverse("child:child-register"),data={"token":token}, format="json")
            
            self.assertEqual(res.status_code,status.HTTP_200_OK)   
            self.assertIn(res.content[1],res.content)   # ensure the session key is returned .     
                

    def test_child_register_with_token_not_valid(self):
        """test the child registration withou a valid token"""
        
        parent  = create_user(
            email="admin@gmail.com",
            password="def123",
            username="def"
        )
        
        token_not_valid = "DERTG"
        
        res = self.client.post(reverse("child:child-register"),
                data={"token":token_not_valid}, format="json")
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)
    