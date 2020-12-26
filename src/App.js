import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import { refresh } from './store/slices/auth';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(store => store.auth.isRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  let app;

  if (isRefreshing) {
    app = <span>Loading...</span>;
  } else {
    app =
      <BrowserRouter>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
  }

  return app;
}

export default App;
