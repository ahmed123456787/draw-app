from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from core.models import * 


DRAW_PARENT_URL=reverse("draw:parent-draws")


def create_child(parent):
    return Child.objects.create(name="mohamed",parent=parent)


class DrawParentTest(TestCase):
    """Test the draw manipulation for the parent"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create(
            email="def@gmail.com",
            password="def123"
        )
        self.client.force_authenticate(user=self.user)
        
    def test_list_draw(self):
        """test listing the draw for a specific child"""
        
        
        data = {
            "name": "monaliza",
            "draw_content": {
                "def": "def"
            }
            
        }
        
        child_1 = create_child(self.user)
        child_2 = create_child(get_user_model().objects.create(username="fff@gmail.com",password="def"))
        
        draw_1 = Draw.objects.create(**data,child=child_1) 
        draw_2 = Draw.objects.create(**data,child=child_2)
        
        res = self.client.get(DRAW_PARENT_URL)
        
        self.assertEqual(res.status_code,200)