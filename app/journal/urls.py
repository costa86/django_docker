
from django.urls import path
from . views import notes_all, note_add, note_edit, note_delete, map_view, drone, restricted

urlpatterns = [
    path('', notes_all, name="notes_all"),
    path('note/add/', note_add, name="note_add"),
    path('note/<int:pk>/edit/', note_edit, name="note_edit"),
    path('note/<int:pk>/delete/', note_delete, name="note_delete"),
    path('note/map/<int:id>/', map_view, name="map_view"),
    path('note/map/drone/', drone, name="drone"),
    path('note/map/restricted/<int:area_id>/', restricted, name="restricted")


]
