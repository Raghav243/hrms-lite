from rest_framework import viewsets
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count
from django.utils.timezone import now

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all().order_by("-created_at")
    serializer_class = EmployeeSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()   # 👈 ADD THIS BACK
    serializer_class = AttendanceSerializer

    def get_queryset(self):
        queryset = Attendance.objects.all().order_by("-date")

        employee_id = self.request.query_params.get("employee")
        date = self.request.query_params.get("date")

        if employee_id:
            queryset = queryset.filter(employee__id=employee_id)

        if date:
            queryset = queryset.filter(date=date)

        return queryset
    
@api_view(["GET"])
def dashboard_summary(request):
    today = now().date()

    total_employees = Employee.objects.count()

    today_attendance = Attendance.objects.filter(date=today)

    present_count = today_attendance.filter(status="Present").count()
    absent_count = today_attendance.filter(status="Absent").count()

    return Response({
        "total_employees": total_employees,
        "today_attendance": today_attendance.count(),
        "present_count": present_count,
        "absent_count": absent_count,
        "date": today,
    })
