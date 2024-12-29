from django.urls import path,include
from .views import * 
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import TokenRefreshView

 
app_name="child"

router = DefaultRouter()
router.register(r'children', ChildCreateDeleteListView, basename='children')

urlpatterns = [ 
    path('', include(router.urls)),
    path("child-register/",child_login_view, name="child-register"),
    path("",UserCreateView.as_view(),name="create-user"),
    path("",ManagerUserView.as_view(),name="modify-user"),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]