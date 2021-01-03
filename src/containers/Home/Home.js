import {
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import {
  useHistory,
  useRouteMatch,
  Switch,
  Route
} from 'react-router-dom';

import classes from './Home.module.css';
import NoteDetail from './Notes/NoteDetail/NoteDetail';
import Notes from './Notes/Notes';

import Sidebar from './Sidebar/Sidebar';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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
    return (
      <div>
        <Sidebar
          selectedIcon={currentPageState}
          onNotesSelect={sidebarNotesSelectionHandler}
          onAddNoteSelect={sidebarAddNoteSelectionHandler}
          onFavoriteNotesSelect={sidebarFavoriteNotesSelectionHandler}
        />
        <main className={classes.MainContent}>
          <Switch>
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
          </Switch>
        </main>
      </div>
    );
  } else {
    return null;
  }
};

export default Home;
