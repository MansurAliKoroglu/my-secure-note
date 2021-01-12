import {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import classes from './Home.module.css';

import NoteDetail from './Notes/NoteDetail/NoteDetail';
import Notes from './Notes/Notes';
import Sidebar from './Sidebar/Sidebar';
import { getNotesFromServer } from '../../store/slices/notes';

const Home = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isNotesLoading = useSelector(state => state.notes.isNotesLoading);

  const history = useHistory();
  const { path } = useRouteMatch();

  let currentPage;

  switch (history.location.pathname) {
    case '/notes/create':
      currentPage = 'create-note';
      break;
    case '/notes/favorites':
      currentPage = 'favorite-notes';
      break;
    default:
      currentPage = 'notes';
      break;
  }

  const [currentPageState, setCurrentPageState] = useState(currentPage);

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/auth');
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (isNotesLoading && isAuthenticated) {
      dispatch(getNotesFromServer());
    }
  }, [isNotesLoading, isAuthenticated, dispatch]);

  const sidebarNotesSelectionHandler = () => {
    if (history.location.pathname === '/') {
      return;
    }

    setCurrentPageState('notes');

    history.push(`${path}`);
  };

  const sidebarAddNoteSelectionHandler = () => {
    if (history.location.pathname === '/create-note') {
      return;
    }

    setCurrentPageState('create-note');

    history.push(`${path}/create`);
  };

  const sidebarFavoriteNotesSelectionHandler = () => {
    if (history.location.pathname === '/favorite-notes') {
      return;
    }

    setCurrentPageState('favorite-notes');

    history.push(`${path}/favorites`);
  };

  if (isAuthenticated) {
    let content;
    if (isNotesLoading) {
      content = <div
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
      </div>;
    } else {
      content = <Switch>
        <Route path={`${path}/create`}>
          {/* TODO: Create new note content */}
        </Route>
        <Route path={`${path}/favorites`}>
          {/* TODO: List favorite notes content */}
        </Route>
        <Route path={`${path}/:id`}>
          <NoteDetail />
        </Route>
        <Route path={path}>
          <Notes />
        </Route>
      </Switch>;
    }

    return (
      <div>
        <Sidebar
          selectedIcon={currentPageState}
          onNotesSelect={sidebarNotesSelectionHandler}
          onAddNoteSelect={sidebarAddNoteSelectionHandler}
          onFavoriteNotesSelect={sidebarFavoriteNotesSelectionHandler}
        />
        <main className={classes.MainContent}>
          {content}
        </main>
      </div>
    );
  } else {
    return null;
  }
};

export default Home;
