import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';

import classes from './Home.module.css';

import Sidebar from './Sidebar/Sidebar';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();
  const { path } = useRouteMatch();

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/auth');
    }
  }, [isAuthenticated, history]);

  if (isAuthenticated) {
    return (
      <div>
        <Sidebar />
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
