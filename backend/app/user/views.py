from .serializers import UserSerializer, ChildCreationSerializer, TokenChildVerificationSerializer
from core.models import User, Child
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.mixins import CreateModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
import rest_framework.status as status
from rest_framework.authentication import SessionAuthentication
from .token_hashing import generate_token_from_name


class UserCreateView (CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    


class ManagerUserView (RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    
class ChildCreateView(GenericViewSet,CreateModelMixin):
    serializer_class = ChildCreationSerializer
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
    
    
class TokenChildVerificationView(CreateAPIView):
    """"""
    serializer_class = TokenChildVerificationSerializer
    queryset = Child.objects.all()
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)     
        
        serializer.is_valid(raise_exception=True)

        # Retrieve the child with the valid token
        token = serializer.validated_data['token']
        child = Child.objects.get(token=token)

        # Optionally, create a session or return child-specific details
        return Response({
            "message": "Token is valid. Login successful.",
            "child_id": child.id,
            "child_name": child.name,
        }, status=status.HTTP_200_OK)
   