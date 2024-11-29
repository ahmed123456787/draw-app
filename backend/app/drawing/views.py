from rest_framework.viewsets import ModelViewSet
from .serializers import DrawSerializer
from core.models import Draw
from rest_framework.response import Response
import rest_framework.status as status


class DrawViewSet(ModelViewSet):
    """Create a modelviewset"""
    
    serializer_class = DrawSerializer
    queryset = Draw.objects.all()
    
    
    def get_queryset(self):
        child = self.request.user
        
        draws = Draw.objects.filter(child=child) 
        return draws
    
    def create(self, request, *args, **kwargs):
        draw_name = request.data["name"]
        draw_content = request.data["content"]
        
        if draw_name is None  :
            return Response({"message":"The name of draw must be profided"},status=status.HTTP_400_BAD_REQUEST)
        
        if  draw_content is None:
            return Response({"message":"The content of draw must be profided"},status=status.HTTP_400_BAD_REQUEST)
            
        
        data = {
            "name":draw_name,
            "draw_content":draw_content,
            "child":self.request.user
        }