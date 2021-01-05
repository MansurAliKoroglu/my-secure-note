import { createSlice } from '@reduxjs/toolkit';

import api from '../../api';

const getNotesFromServer = () => {
  return async dispatch => {
    dispatch(notesSlice.actions.setIsNotesLoading(true));

    const notes = await api.notes.listNotes();
    dispatch(notesSlice.actions.setNotes(notes));

    dispatch(notesSlice.actions.setIsNotesLoading(false));
  };
};

const updateNote = note => {
  return async (dispatch, getState) => {
    await api.notes.updateNote(note);

    const updatedNotes = [...getState().notes.notes];
    const noteIndex = updatedNotes.findIndex(element => element.id === note.id);

    const updatedNote = {
      id: updatedNotes[noteIndex].id,
      title: note.title,
      note: note.note
    };

    updatedNotes[noteIndex] = updatedNote;

    dispatch(notesSlice.actions.setNotes(updatedNotes));
  };
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    isNotesLoading: true,
    notes: []
  },
  reducers: {
    setIsNotesLoading(state, action) {
      state.isNotesLoading = action.payload;
    },
    setNotes(state, action) {
      state.notes = action.payload;
    }
  }
});

export default notesSlice.reducer;

export { getNotesFromServer, updateNote };
