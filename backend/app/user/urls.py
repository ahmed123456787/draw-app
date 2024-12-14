from django.urls import path,include
from .views import * 
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
app_name="child"

router = DefaultRouter()
router.register(r'child', ChildCreateDeleteListView, basename='child')

urlpatterns = [ 
    path('', include(router.urls)),
    path("child-register/",child_login_view, name="child-register"),
    path("create/",UserCreateView.as_view(),name="create-user"),
    path("modify/",ManagerUserView.as_view(),name="modify-user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]