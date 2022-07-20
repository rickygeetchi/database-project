from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from EmployeeApp.models import Department,Employees
from EmployeeApp.serializers import DepartmentSerializer,EmployeeSerializer
# Create your views here.


@api_view(['GET'])
def getData(request):
    person={'name':'Dennis','age':28}
    return Response(person)

@csrf_exempt
def departmentApi(request,id=0):
    if request.method == 'GET':
        departments = Department.objects.all()
        departments_serializer=DepartmentSerializer(departments,many=True)
        return JsonResponse(departments_serializer.data,safe=False)
    elif request.method =='POST':
        departments_data=JSONParser(request)
        departments_serializer=DepartmentSerializer(data=departments_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        departments_data=JSONParser().parse(request)
        department=Department.objects.get(DepartmentId=departments_data['DepartmentId'])
        departments_serializer=DepartmentSerializer(department,data=departments_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Update Successfully",safe=False)
    elif request.method=="DELETE":
        department=Department.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse("Deleted Successfully",safe=False)
