import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import store from "./store";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
