from .serializers import UserSerializer, ChildSerializer
from core.models import User, Child
from django.contrib.sessions.models import Session
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin,ListModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
import rest_framework.status as status
from .token_hashing import generate_token_from_name
from django.http import JsonResponse
from django.utils.timezone import now
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.db import IntegrityError


class UserCreateView (CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    


class ManagerUserView (UpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    
class ChildCreateDeleteListView(GenericViewSet,
                                CreateModelMixin,
                                DestroyModelMixin,
                                ListModelMixin):
    
    """Create, List and Delete a child"""
    serializer_class = ChildSerializer
    queryset = Child.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return self.queryset.filter(parent=self.request.user)
    
    def create(self, request, *args, **kwargs):

        child_name = request.data["name"] # we check for the child name
        
        if child_name is None :
            return Response({"message":"The child name must be provided"},status=status.HTTP_400_BAD_REQUEST)
        
        token = generate_token_from_name(child_name,self.request.user.username)
        
        data = {
            "name":child_name,
            "token":token,
            "parent":self.request.user
        }
        
        #serialize the data of a child and save it
        serializer = self.get_serializer(data=data)
         
        try:
            serializer.is_valid()
            serializer.save(token=token,parent=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError as e :
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
    
    

    def destroy(self, request, *args, **kwargs):
        """Delete the child with his session data"""
        
        child_id = kwargs.get("pk")
        if not child_id:
            return Response({"error": "Child name not provided"}, status=status.HTTP_404_NOT_FOUND)

        try:
            child = Child.objects.get(id=child_id, parent=request.user)
        except Child.DoesNotExist:
            return Response({"error": "Child not found or you're not authorized to delete"}, status=status.HTTP_404_NOT_FOUND)
        
        # Find and delete the child’s session
        child_token = request.session.get('child_token')
        if child_token:
            try:
                session = Session.objects.get(session_key=request.session.session_key)
                session_data = session.get_decoded()
                if session_data.get('child_token') == child_token:
                    session.delete()
            except Session.DoesNotExist:
                pass  # If session doesn't exist, skip the deletion

        # Delete the child
        child.delete()

        return Response({"message": f"Child '{child.name}' deleted successfully and session removed."}, status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        # Serialize the queryset
        serializer = self.get_serializer(self.get_queryset(), many=True)
        
        # Return serialized data
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def child_login_view(request):
    """
    Handles login for a child using a token.
    If the child already has a valid session, it reuses the session.
    If the session is expired or doesn't exist, it creates a new session.
    """
    if request.method == "POST":
        token = request.data.get("token")
        if not token:
            return JsonResponse({"error": "Token not provided"}, status=400)

        try:
            child = Child.objects.get(token=token)
        except Child.DoesNotExist:
            return JsonResponse({"error": "Invalid token"}, status=401)

        # Check for an existing session by session_key
        session_key = request.session.session_key  # Get the current session key
            # Check if the current session still exists
        try:
            session = Session.objects.get(session_key=session_key)
            # If the session is valid, return success
            return JsonResponse({
                "message": "Login successfule",
                "session_key": session.session_key
            })
        except Session.DoesNotExist:
            # If session does not exist, create a new session
            request.session['child_token'] = child.token
            request.session.save()

            return JsonResponse({
                "message": "New session created",
                "session_key": request.session.session_key
            })
        
        

    return JsonResponse({"error": "Method not allowed"}, status=405)
