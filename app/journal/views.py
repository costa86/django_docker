from django.shortcuts import render, redirect, get_object_or_404
from . models import Note
from . forms import NoteForm
from django.contrib.auth.decorators import login_required

templates = {
    "all": "journal/notes_all.html",
    "add": "journal/note_add_edit.html",
    "edit": "journal/note_add_edit.html"
}


def notes_all(request):
    records = Note.objects.all()
    return render(request, templates["all"], {"records": records})


def note_delete(request, pk):
    record = get_object_or_404(Note, pk=pk)
    record.delete()
    return redirect("notes_all")

@login_required
def note_add(request):
    if request.method == "POST":
        form = NoteForm(request.POST)
        if form.is_valid():
            note = form.save(commit=False)
            note.author = request.user
            note.publish()
            return redirect("notes_all")
    else:
        form = NoteForm()
    return render(request, templates["add"], {"form": form})


def note_edit(request, pk):
    record = get_object_or_404(Note, pk=pk)
    if request.method == "POST":
        form = NoteForm(request.POST, instance=record)
        if form.is_valid():
            note = form.save(commit=False)
            note.author = request.user
            note.publish()
            return redirect("notes_all")
    else:
        form = NoteForm(instance=record)
    return render(request, templates["edit"], {"form": form})
