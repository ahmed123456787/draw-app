from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"child/draws",DrawChildViewSet, basename="child-draw")


urlpatterns = [
    path("parent/draws/", DrawParentView.as_view({'get': 'list'}), name="parent-draws"),
    path("parent/draws/<int:pk>/", DrawParentView.as_view({'get': 'retrieve', 'patch': 'update', 'delete': 'destroy'}), name="parent-draw-detail"),
    
    path("", include(router.urls)),
]