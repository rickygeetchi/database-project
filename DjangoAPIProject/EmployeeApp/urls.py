from importlib.resources import path
from webbrowser import get
import django
from django.urls import re_path, path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    path('department/',views.departmentApi),
    re_path(r'^department/([0-9]+)', views.departmentApi),
    # path('',views.getData)

    path('employee/', views.employeeApi),
    re_path(r'^employee/([0-9]+)', views.employeeApi),

    re_path(r'^employee/savefile',views.SaveFile)


]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)