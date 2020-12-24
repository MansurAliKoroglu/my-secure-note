import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NotFound from './containers/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
