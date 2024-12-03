from django.test import TestCase
from django.contrib.auth import get_user_model

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