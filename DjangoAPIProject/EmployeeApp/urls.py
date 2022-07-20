from importlib.resources import path
from webbrowser import get
from django.urls import path
from . import views



urlpatterns=[
    path('department/',views.departmentApi),
    path(r'department/([0-9]+)', views.departmentApi),
    # path('',views.getData)

]