import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import LoginPageContainer from "../../containers/LoginPageContainer";
import { Layout } from "../../Layout";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import Projects from "../../pages/Projects";

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
