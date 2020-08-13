
from django.urls import path
from . views import notes_all, note_new

urlpatterns = [
    path('', notes_all, name="notes_all"),
    path('note/new/', note_new, name="note_new")

]
