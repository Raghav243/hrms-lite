from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, AttendanceViewSet
from .views import dashboard_summary
from django.urls import path


router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'attendance', AttendanceViewSet)

urlpatterns = router.urls

urlpatterns += [
    path("dashboard/", dashboard_summary),
]

