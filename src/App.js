import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import NotFound from './containers/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
