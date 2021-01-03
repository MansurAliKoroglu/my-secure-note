import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  useEffect
} from 'react';
import Loader from 'react-loader-spinner';
import { useHistory, useRouteMatch } from 'react-router-dom';

import classes from './Notes.module.css';

import { getNotesFromServer } from '../../../store/slices/notes';
import Note from './Note/Note';

const Notes = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const dispatch = useDispatch();
  const isNotesLoading = useSelector(state => state.notes.isNotesLoading);
  const notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    if (isNotesLoading) {
      dispatch(getNotesFromServer());
    }
  }, [isNotesLoading, dispatch]);

  const noteClickHandler = index => {
    history.push(`${path}/${index}`);
  };

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
    const noteComponents = notes.map((note, index) =>
      <Note
        key={note.id}
        title={note.title}
        className={[classes.Note]}
        onClick={() => { noteClickHandler(index); }}
      />
    );

    return (
      <div className={classes.Notes}>
        {noteComponents}
      </div>
    );
  }
};

export default Notes;
