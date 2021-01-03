import {
  useSelector
} from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import classes from './Notes.module.css';

import Note from './Note/Note';

const Notes = () => {
  const history = useHistory();
  const { path } = useRouteMatch();

  const notes = useSelector(state => state.notes.notes);

  const noteClickHandler = index => {
    history.push(`${path}/${index}`);
  };

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
};

export default Notes;
