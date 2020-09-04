from django.shortcuts import render, redirect, get_object_or_404
from . models import Restricted
from django.contrib.auth.decorators import login_required

templates = {
    "intro": "maps/intro.html",
}

def intro(request):
    maps = Restricted.objects.all()
    msg = "hi"
    context = {"msg":msg,"maps":maps}
    return render(request, templates["intro"], context)
