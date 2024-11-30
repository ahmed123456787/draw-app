from rest_framework import serializers
from core.models import Draw
from user.serializers import ChildSerializer
class DrawParentSerializer(serializers.ModelSerializer):
    child = ChildSerializer()
    class Meta :
        model = Draw
        fields = ["id","name", "draw_content","is_locked", "is_archived", "child"]
        
        
        
        
class DrawChildSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Draw
        fields = ["id","name", "draw_content"]        