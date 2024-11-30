from django.urls import path,include
from .views import * 
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'child', ChildCreateDeleteView, basename='child')

urlpatterns = [ 
    path('', include(router.urls)),
    path("child-register/",ChildCreateSessionView.as_view()),
    path("create/",UserCreateView.as_view(),name="create-user"),
    path("modify/",ManagerUserView.as_view(),name="modify-user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]