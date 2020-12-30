import {
  useState,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';

import classes from './Home.module.css';

import Sidebar from './Sidebar/Sidebar';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();
  const { path } = useRouteMatch();

  let currentPage;

  switch (history.location.pathname) {
    case '/':
      currentPage = 'notes';
      break;
    case '/create-note':
      currentPage = 'create-note';
      break;
    case '/favorite-notes':
      currentPage = 'favorite-notes';
      break;
    default:
      throw new Error('There is an error');
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

    history.push(`${path}create-note`);
  };

  const sidebarFavoriteNotesSelectionHandler = () => {
    if (history.location.pathname === '/favorite-notes') {
      return;
    }

    setCurrentPageState('favorite-notes');

    history.push(`${path}favorite-notes`);
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
            <Route path={`${path}create-note`}>
              {/* TODO: Create new note content */}
            </Route>
            <Route path={`${path}favorite-notes`}>
              {/* TODO: List favorite notes content */}
            </Route>
            <Route path={`${path}`}>
              {/* TODO: List all notes content */}
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
