import { Switch, Route, Redirect } from "react-router-dom";

import Dummy from "../../pages/dummy";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Dummy />
      </Route>
      <Route path="/login">
        <Dummy />
      </Route>
      <Route path="/interview">
        <Dummy />
      </Route>
      <Route path="/project/:id">
        <Dummy />
      </Route>
      <Route path="/search">
        <Dummy />
      </Route>
      <Route path="/result/:id">
        <Dummy />
      </Route>
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
