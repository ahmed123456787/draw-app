from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from core.models import * 


DRAW_PARENT_URL=reverse("draw:parent-draws")


def create_child(parent):
    return Child.objects.create(name="mohamed",parent=parent)


def detailurl(draw_id):
    return reverse(f"draw:parent-draw-detail",args=[draw_id])



class DrawParentTest(TestCase):
    """Test the draw manipulation for the parent"""
    
    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create(
            email="def@gmail.com",
            password="def123"
        )
        self.client.force_authenticate(user=self.user)
        
    def test_list_draws(self):
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
        self.assertEqual(len(res.data),1)
        self.assertEqual(res.data[0]['child']["name"],child_1.name)
        
    def test_update_lock_and_archived_field(self):
        """"""
        draw = Draw.objects.create(
            name="monaliza",
            child=create_child(self.user),
            draw_content={
                "def":"def"
            },
        )
        # we assert if it is false by default when creating .
        self.assertFalse(draw.is_archived)
        self.assertFalse(draw.is_locked)
        
        data = {
            "is_locked": True,
            "is_archived": True
        }
        
        url = detailurl(draw.id)
        res = self.client.patch(url,data=data)
        
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        self.assertTrue(res.data['is_archived'])
        self.assertTrue(res.data['is_locked'])
        
    def test_delete_draw(self):
        """Test deleting a draw"""
        
        draw = Draw.objects.create(
            name="monaliza",
            child=create_child(self.user),
            draw_content={
                "def":"def"
            },
        )
        url = detailurl(draw.id)
        res = self.client.delete(url)
        self.assertEqual(len(Draw.objects.all()),0)
        self.assertEqual(res.status_code,status.HTTP_204_NO_CONTENT)
                 
    # def test_d(self): 
                         