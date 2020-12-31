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
    },
  }
});

export default notesSlice.reducer;

export { getNotesFromServer };
