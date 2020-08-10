from . views import intro

from django.urls import path

urlpatterns = [
    path('', intro,name="intro")
]
