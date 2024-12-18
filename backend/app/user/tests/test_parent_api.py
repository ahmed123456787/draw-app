from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from core.models import Child
from user.token_hashing import generate_token_from_name
import json

CHILD_URL = reverse("child:child-list")

def detail_url(child_id):
    """Return a single recipe detail URL"""
    return reverse("child:child-detail", args=[child_id])

def create_user(**params):
    """create a user"""
    return get_user_model().objects.create(**params)


class TestPublicUser(TestCase): 
    """Test the api in case of not authorized"""
    
    def setUp(self):
        self.client = APIClient()
        
    
    def test_unauthorized_request(self):
        """test if the auth is required"""  
        
        data = {
            "name":"jalil"
        }
        res = self.client.post(CHILD_URL,data=data)
        self.assertEqual(res.status_code,status.HTTP_401_UNAUTHORIZED)
        
class TestPrivateUser(TestCase):
    """test the authorized user"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create(
            email="admin@gmail.com",
            password="admin123"
        )
        self.client.force_authenticate(user=self.user)
    
    def test_create_new_child(self):
        """test creation a new child"""
        
        data = {
            "name":"jalil",
            "parent":self.user
        }        
        res = self.client.post(CHILD_URL,data=data)
        
        self.assertEqual(res.status_code,status.HTTP_201_CREATED)
        child = Child.objects.get(id=res.data["id"])
        self.assertEqual(data["name"],child.name)
        self.assertEqual(data["parent"],child.parent)
    
    def test_delete_child(self):
        """test deleting the child"""
        
        # creating a new child
        child = Child.objects.create(name="jalil",parent=self.user)
        
        DELETE_CHILD_URL = detail_url(child.id)
        res = self.client.delete(DELETE_CHILD_URL)
        
        self.assertEqual(len(Child.objects.all()),0)        
    
    
    def test_list_childs(self):
        """create childs and test to list them"""
        user1 = create_user(
            username="define@gmail.com",
            password="admin123f"
        )
        child_1 = Child.objects.create(name="mohamed", parent=self.user)
        child_2 = Child.objects.create(name="dani", parent=user1)
        
        
        res = self.client.get(CHILD_URL)
        self.assertEqual(len(json.loads(res.content)),1)
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        self.assertEqual(res.data[0]['name'],child_1.name)