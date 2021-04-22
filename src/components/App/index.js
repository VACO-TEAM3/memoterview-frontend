import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import InterviewPageContainer from "../../containers/InterviewPageContainer";
import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import theme from "../../Layout/theme/theme";
import Dummy from "../../pages/dummy";
import Projects from "../../pages/Projects";
import VoiceToTextTestPage from "../../pages/VoiceToTextTestPage";
import AuthRoute from "../AuthRoute";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <AuthRoute path="/projects" exact>
          <ProjectsContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewPageContainer />
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
        <AuthRoute path="/voiceTest">
          <VoiceToTextTestPage />
        </AuthRoute>
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
}
