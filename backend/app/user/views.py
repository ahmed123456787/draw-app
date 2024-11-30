from .serializers import UserSerializer, ChildSerializer, TokenChildVerificationSerializer
from core.models import User, Child
from django.contrib.sessions.models import Session
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
import rest_framework.status as status
from .token_hashing import generate_token_from_name


class UserCreateView (CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    


class ManagerUserView (RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    
class ChildCreateDeleteView(GenericViewSet,CreateModelMixin,DestroyModelMixin):
    """Create and Delete a child"""
    serializer_class = ChildSerializer
    queryset = Child.objects.all()
    permission_classes = [IsAuthenticated]
    
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
        serializer.is_valid(raise_exception=True)
        serializer.save(token=token,parent=self.request.user)
        
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    

    def destroy(self, request, *args, **kwargs):
        child_name = kwargs.get("pk")

        if not child_name:
            return Response({"error": "Child name not provided"}, status=status.HTTP_404_NOT_FOUND)

        try:
            child = Child.objects.get(name=child_name, parent=request.user)
        except Child.DoesNotExist:
            return Response({"error": "Child not found or not authorized to delete"}, status=status.HTTP_404_NOT_FOUND)
        # Find and delete the child’s session
        child_name = request.session.get('child_name')
        print(request.session.get('child_name'))
        if child_name:
            # Look for the session with the child's token and delete it
            try:
                session = Session.objects.get(session_key=request.session.session_key)
                session_data = session.get_decoded()
                if session_data.get('child_name') == child_name:
                    session.delete()
            except Session.DoesNotExist:
                pass  # If session doesn't exist, skip the deletion

        # Delete the child
        child.delete()

        return Response({"message": f"Child '{child_name}' deleted successfully and session removed."}, status=status.HTTP_204_NO_CONTENT)

    
class ChildCreateSessionView(CreateAPIView):
    """View to register the child and create a session"""

    def post(self, request, *args, **kwargs):
        serializer = TokenChildVerificationSerializer(data=request.data)
        if serializer.is_valid():
            token = serializer.validated_data["token"]
            try:
                # Verify if the child exists with the provided token
                child = Child.objects.get(token=token)

                # Create a session for the child
                request.session["child_id"] = child.id
                request.session["child_name"] = child.name

                # The session ID is automatically set in the response as a cookie
                return Response(
                    {"message": f"Session created for {child.name}"},
                    status=status.HTTP_200_OK,
                )
            except Child.DoesNotExist:
                return Response(
                    {"error": "Invalid token or child not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



        