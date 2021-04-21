import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import Interview from "../../pages/Interview";
import Projects from "../../pages/Projects";
import VoiceToTextTestPage from "../../pages/VoiceToTextTestPage";
import AuthRoute from "../AuthRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <AuthRoute path="/projects">
          <ProjectsContainer />
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
        <Route path="/voiceTest">
          <VoiceToTextTestPage />
        </Route>
        <Redirect to="/" />
      </Switch>
=======
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Dummy />
          </Route>
          <Route path="/login">
            <LoginPageContainer />
          </Route>
          <Route path="/projects" exact>
            <Projects />
          </Route>
          <Route path="/projects/:id">
            <Interview />
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
>>>>>>> [ADD] connect to camera
    </ThemeProvider>
  );
}

export default App;
