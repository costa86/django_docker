from django.shortcuts import render, redirect, get_object_or_404
from . models import Note
from . forms import NoteForm
from django.contrib.auth.decorators import login_required

templates = {
    "all": "journal/notes_all.html",
    "add": "journal/note_add_edit.html",
    "edit": "journal/note_add_edit.html",
    "map": "journal/view_map.html",
    "drone": "journal/drone.html",
    "restricted": "journal/restricted_area.html",
}

areas = {
    0: "Lisbon",
    1: "Porto"
}


def restricted(request, area_id):
    return render(request, templates["restricted"], {"area": areas[area_id]})


def drone(request):
    return render(request, templates["drone"])


def map_view(request, id):
    title = "Map (Navigate to)" if id == 1 else "Map (find my location)"
    return render(request, templates["map"], {"id": id})


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
