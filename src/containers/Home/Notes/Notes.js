import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  useEffect
} from 'react';
import Loader from 'react-loader-spinner';

import classes from './Notes.module.css';

import { getNotesFromServer } from '../../../store/slices/notes';
import Note from './Note/Note';

const Notes = () => {
  const dispatch = useDispatch();
  const isNotesLoading = useSelector(state => state.notes.isNotesLoading);
  const notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    dispatch(getNotesFromServer());
  }, [dispatch]);


  if (isNotesLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Loader
          type="TailSpin"
          color="#00BFFF"
        />
      </div>
    )
  } else {
    const noteComponenets = notes.map(note => <Note key={note.id} title={note.title} className={[classes.Note]} />);

    return (
      <div className={classes.Notes}>
        {noteComponenets}
      </div>
    );
  }
};

export default Notes;
