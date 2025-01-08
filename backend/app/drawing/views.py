from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import  DestroyModelMixin, UpdateModelMixin, RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import DrawChildSerializer, DrawParentSerializer
from core.models import Draw, Child
from rest_framework.response import Response
import rest_framework.status as status
from rest_framework.exceptions import PermissionDenied, NotFound, ValidationError
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.base import ContentFile
import base64


class DrawChildViewSet(ModelViewSet):
    """
    CRUD operations for Draw objects associated with the authenticated child.
    """
    serializer_class = DrawChildSerializer

    def get_queryset(self):
        """
        Filter the queryset based on the authenticated child.
        """
        try:
            child = self._get_authenticated_child()
            return Draw.objects.filter(child=child, is_locked=False, is_archived=False)
        except PermissionDenied as e:
            raise PermissionDenied(str(e))

    def _get_authenticated_child(self):
        """
        Helper method to retrieve the authenticated child based on the token.
        """
        token = self.request.headers.get('Authorization', '').split('Token ')[-1]
        if not token:
            raise PermissionDenied("Authorization token is required.")

        try:
            return Child.objects.get(token=token)
        except Child.DoesNotExist:
            raise PermissionDenied("Invalid or expired token.")

    def list(self, request, *args, **kwargs):
        """
        Retrieve all draws for the authenticated child.
        """
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return self._handle_exception(e)

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific draw for the authenticated child.
        """
        try:
            draw = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
            serializer = self.get_serializer(draw)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return self._handle_exception(e)

    def create(self, request, *args, **kwargs):
        """
        Create a new draw for the authenticated child.
        """
        try:
            child = self._get_authenticated_child()
            serializer = self.get_serializer(data={**request.data, "child": child.id})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return self._handle_exception(e)

    def update(self, request, *args, **kwargs):
        """
        Update a draw for the authenticated child.
        """
        try:
            child = self._get_authenticated_child()
            draw = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
            serializer = self.get_serializer(draw, data={**request.data,"child":child.id})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return self._handle_exception(e)



    def partial_update(self, request, *args, **kwargs):
        """
        Partially update a draw for the authenticated child.
        """
        try:
            # Get the authenticated child and the draw object
            child = self._get_authenticated_child()
            draw = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
            
            # Merge the request data with the authenticated child's ID
            serializer = self.get_serializer(draw, data={**request.data, "child": child.id}, partial=True)
            
            try :
                
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK) 
            except ValidationError as ve:
                # Catch validation errors and return a detailed response
                return Response(
                    {"detail": "Invalid image format or data", "errors": ve.detail},
                    status=status.HTTP_400_BAD_REQUEST,
                )

         

        except Exception as e:
            # Catch all other errors and handle them appropriately
            return Response(
                {"detail": "An unexpected error occurred.", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


    def destroy(self, request, *args, **kwargs):
        """
        Delete a draw for the authenticated child.
        """
        try:
            draw = get_object_or_404(self.get_queryset(), pk=kwargs['pk'])
            draw.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return self._handle_exception(e)

    def _handle_exception(self, exception):
        """
        Generic exception handler to standardize error responses.
        """
        if isinstance(exception, PermissionDenied):
            return Response({"detail": str(exception)}, status=status.HTTP_403_FORBIDDEN)
        elif isinstance(exception, NotFound):
            return Response({"detail": "Resource not found."}, status=status.HTTP_404_NOT_FOUND)
        elif isinstance(exception, ValidationError):
            return Response({"detail": exception.detail}, status=status.HTTP_400_BAD_REQUEST)
        elif isinstance(exception, ObjectDoesNotExist):
            return Response({"detail": "Related object not found."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Handle unexpected errors
            return Response(
                {"detail": "An unexpected error occurred.", "error": str(exception)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



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
        
        
     