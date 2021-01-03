import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import { initialize } from './store/slices/auth.js';

function App() {
  const dispatch = useDispatch();
  const isInitializing = useSelector(state => state.auth.isInitializing);

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  let app;

  if (isInitializing) {
    app = <div>Loading...</div>;
  } else {
    app =
      <BrowserRouter>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/notes">
            <Home />
          </Route>
          <Route path="/">
            <Redirect to="/notes" />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>;
  }

  return app;
}

export default App;
