from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin, UpdateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import DrawChildSerializer, DrawParentSerializer
from core.models import Draw, Child
from rest_framework.response import Response
import rest_framework.status as status

class DrawChildViewSet(ModelViewSet):
    """CRUD operations for Draw for the child"""
    
    serializer_class = DrawChildSerializer
    queryset = Draw.objects.all()
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        child = self.request.user  # Assuming the user is the child here
        return Draw.objects.filter(child=child, is_locked=False, is_archived=False)
    
    def list(self, request, *args, **kwargs):
        """List all the draws for the authenticated child"""
        # Get all the draws for the authenticated child
        draws = self.get_queryset()
        
        # Serialize and return the list of draws
        serializer = self.get_serializer(draws, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        """Retrieve a specific draw for the authenticated child"""
        try:
            # Get the specific draw object by primary key (pk)
            draw = self.get_queryset().get(pk=kwargs['pk'])
        except Draw.DoesNotExist:
            return Response({"message": "Draw not found"}, status=status.HTTP_404_NOT_FOUND)

        # Serialize and return the draw data
        serializer = self.get_serializer(draw)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """Create a draw for the authenticated child"""
        draw_name = request.data["name"]
        draw_content = request.data["content"]
        
        if not draw_name:
            return Response({"message": "The name of draw must be provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not draw_content:
            return Response({"message": "The content of draw must be provided"}, status=status.HTTP_400_BAD_REQUEST)
             
        data = {
            "name": draw_name,
            "draw_content": draw_content,
            "child": self.request.user  # The child is the authenticated user
        }
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
  

class DrawParentView(GenericViewSet,
                     ListModelMixin,
                     RetrieveModelMixin,
                     DestroyModelMixin,
                     UpdateModelMixin):
    """Update and delete the draw of the child"""
    
    serializer_class = DrawParentSerializer
    queryset = Draw.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get_queryset(self):
        # we get the parent and filter the draw for this parent using reverse relationship .
        parent_user = self.request.user
        return Draw.objects.filter(child__parent=parent_user)
    
    
    def update(self, request, *args, **kwargs):
        
        draw_id = kwargs.get("pk")
        draw = Draw.objects.get(id=draw_id)
        
        serializer = self.get_serializer(draw, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        child_name = request.data.get("child_name")
        draw_name = request.data.get("draw_name")
        
        if not child_name or not draw_name:
            return Response({"message": "Both child_name and draw_name must be provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            child = Child.objects.get(name=child_name,parent=self.request.user)
        except Child.DoesNotExist:
            return Response({"message": "Child not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            draw = Draw.objects.get(name=draw_name, child=child)
        except Draw.DoesNotExist:
            return Response({"message": "Draw not found or not associated with the child"}, status=status.HTTP_404_NOT_FOUND)
        
        draw.delete()
        return Response({"message": f"Draw '{draw_name}' deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
     