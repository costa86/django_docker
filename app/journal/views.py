from django.shortcuts import render, redirect
from . models import Note
from . forms import NoteForm

def notes_all(request):
    records = Note.objects.all()
    return render(request,"journal/notes_all.html",{"records":records})

def note_new(request):
    if request.method == "POST":
        form = NoteForm(request.POST)
        if form.is_valid():
            note = form.save(commit=False)
            note.author = request.user
            note.publish()
            return redirect("notes_all")
    else:
        form = NoteForm()
    return render(request,"journal/note_new.html",{"form":form})