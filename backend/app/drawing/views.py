from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import  DestroyModelMixin, UpdateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import DrawChildSerializer, DrawParentSerializer
from core.models import Draw, Child
from rest_framework.response import Response
import rest_framework.status as status



class DrawChildViewSet(ModelViewSet):
    """CRUD operations for Draw for the child"""
    serializer_class = DrawChildSerializer
    queryset = Draw.objects.all()

    def get_queryset(self):
        """Filter the queryset based on the authenticated child"""
        child_token = self.request.session.get('child_token')

        try:
            child = Child.objects.get(token=child_token)
        except Child.DoesNotExist:
            return Draw.objects.none()  # If child doesn't exist, return an empty queryset.

        return Draw.objects.filter(child=child, is_locked=False, is_archived=False)

    
    def list(self, request, *args, **kwargs):
        """retreive draws for the authenticated child"""
        
        if not self._is_authenticated():
            return Response({"message": "Not authorized"}, status=status.HTTP_401_UNAUTHORIZED)


        serializer = self.get_serializer(Draw.objects.all(),many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    def retrieve(self, request, *args, **kwargs):
        """Retrieve a specific draw for the authenticated child"""
        if not self._is_authenticated():
            return Response({"message": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        try:
            draw = self.get_queryset().get(pk=kwargs['pk'])
        except Draw.DoesNotExist:
            return Response({"message": "Draw not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(draw)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        """Create a draw for the authenticated child"""
        if not self._is_authenticated():
            return Response({"message": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        draw_name = request.data["name"]
        draw_content = request.data["draw_content"]

        if not draw_name:
            return Response({"message": "The name of draw must be provided"}, status=status.HTTP_400_BAD_REQUEST)

        if not draw_content:
            return Response({"message": "The content of draw must be provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Get the authenticated child based on the session token
        child_token = self.request.session.get("child_token")
        try:
            child = Child.objects.get(token=child_token)
        except Child.DoesNotExist:
            return Response({"message": "Child not found"}, status=status.HTTP_404_NOT_FOUND)

        data = {
            "name": draw_name,
            "draw_content": draw_content,
            "child": child.id
        }

        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
    
    
    def destroy(self, request, *args, **kwargs):
        """retreive draws for the authenticated child"""
        
        if not self._is_authenticated():
            return Response({"message": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        draw = self.get_object()
        draw.delete()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)


    def update(self, request, *args, **kwargs):
        """Update a specific draw for the authenticated child"""
        if not self._authenticate():
            return Response({"message": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        try:
            # Retrieve the draw object to update
            draw = self.get_queryset().get(pk=kwargs['pk'])
        except Draw.DoesNotExist:
            return Response({"message": "Draw not found"}, status=status.HTTP_404_NOT_FOUND)

        # Verify the child is trying to update their own draw
        if draw.child.token != self.request.session.get('child_token'):
            return Response({"message": "Not authorized to update this draw"}, status=status.HTTP_403_FORBIDDEN)

        # Prepare the data to update the draw
        draw_name = request.data.get("name", draw.name)
        draw_content = request.data.get("draw_content", draw.draw_content)

        data = {
            "name": draw_name,
            "draw_content": draw_content,
            "child": draw.child.id  # Ensure the child ID is preserved
        }

        # Validate and update the draw
        serializer = self.get_serializer(draw, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self, request, *args, **kwargs):
        """Partially update a specific draw for the authenticated child"""
        if not self._authenticate():
            return Response({"message": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        try:
            # Retrieve the draw object to partially update
            draw = self.get_queryset().get(pk=kwargs['pk'])
        except Draw.DoesNotExist:
            return Response({"message": "Draw not found"}, status=status.HTTP_404_NOT_FOUND)

        # Verify the child is trying to update their own draw
        if draw.child.token != self.request.session.get('child_token'):
            return Response({"message": "Not authorized to update this draw"}, status=status.HTTP_403_FORBIDDEN)

        # Validate the partial data
        data = request.data
        if "name" not in data and "draw_content" not in data:
            return Response({"message": "At least one field must be provided for partial update"}, status=status.HTTP_400_BAD_REQUEST)

        # Partially update the draw
        serializer = self.get_serializer(draw, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def _is_authenticated(self):
        """Helper method to check if the session has a valid child token"""
        child_token = self.request.session.get('child_token')
        if not child_token:
            return False  # No token in session, not authenticated
        try:
            child = Child.objects.get(token=child_token)
        except Child.DoesNotExist:
            return False  # Token is invalid (no corresponding child)
        return True  # Token is valid, authenticated
  




class DrawParentView(GenericViewSet,
                     ListModelMixin,
                     RetrieveModelMixin,
                     DestroyModelMixin,
                     UpdateModelMixin):
    """Update, delete, retreive and list the draw of the child"""
    
    serializer_class = DrawParentSerializer
    queryset = Draw.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    def get_queryset(self):
        parent = self.request.user
        return Draw.objects.filter(child__parent=parent)
    
    
    def update(self, request, *args, **kwargs):  
        draw_id = kwargs.get("pk")
        draw = Draw.objects.get(id=draw_id)
        
        serializer = self.get_serializer(draw, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):   
        draw_id = kwargs.get("pk")
        try:
            draw = Draw.objects.get(id=draw_id,child__parent=self.request.user)
            draw.delete()
            return Response({"message": f"Draw {draw.name} deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            
        except Child.DoesNotExist:
            return Response({"message": "Draw not found"}, status=status.HTTP_404_NOT_FOUND)
        
        
     