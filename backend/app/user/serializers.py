from django.contrib.auth import (
    get_user_model,
    
    )
from rest_framework import serializers
from django.utils.translation import gettext as _
from core.models import Child


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'username']
        extra_kwargs = {"password":{"write_only":True,"min_length":5}}
    
    def create(self,validated_data):
        """create and return a user with encrypted password"""
        return get_user_model().objects.create_user(**validated_data)
    
    def update(self, instance, validated_data):
        """update and return user"""
        password = validated_data.pop('password',None)
        user = super().update(instance,validated_data)
        
        if password:
            user.set_password(password)
            user.save()
        return user   
    
    
class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child    
        fields = ["name","token"]
        extra_kwargs = {"token":{"read_only":True}}

    
    
class TokenChildVerificationSerializer(serializers.ModelSerializer):
    """verify if the child exists and open session for him"""
    class Meta: 
        model = Child
        fields = ["token"]
        
    def validate_token(self, value):
        # Check if a child exists with the given token
        if not Child.objects.filter(token=value).exists():
            raise serializers.ValidationError("Invalid token. Please check and try again.")
        return value