from rest_framework import serializers
from core.models import Draw
from user.serializers import ChildSerializer
from core.models import Child

class DrawParentSerializer(serializers.ModelSerializer):
    child = ChildSerializer()
    class Meta :
        model = Draw
        fields = ["id","name","last_modified", "draw_content","is_locked", "is_archived", "child"]
        read_only_fields= ["id"]     
        
        
        
class DrawChildSerializer(serializers.ModelSerializer):
    child = serializers.PrimaryKeyRelatedField(queryset=Child.objects.all(), write_only=True)
    class Meta: 
        model = Draw
        fields = ["id","name", "draw_content","child"]   
        read_only_fields= ["id"]