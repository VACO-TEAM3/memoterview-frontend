import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import LoginPageContainer from "../../containers/LoginPageContainer";
import Layout from "../../Layout";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import Projects from "../../pages/Projects";

function App() {
  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Dummy />
          </Route>
          <Route path="/login">
            <LoginPageContainer />
          </Route>
          <Route path="/projects">
            <Projects />
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
      </Layout>
=======
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <AuthRoute path="/projects">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/projects/:id">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/result/:id">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/interview">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/search">
          <Dummy />
        </AuthRoute>
        <Redirect to="/" />
      </Switch>
>>>>>>> [ADD] auth router
    </ThemeProvider>
  );
}

export default App;
