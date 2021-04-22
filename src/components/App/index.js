import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import InterviewContainerHelper from "../../containers/interviewContainerHelper";
import InterviewPageContainer from "../../containers/InterviewPageContainer";
import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import TotalResultContainer from "../../containers/TotalResultContainer";
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
        <AuthRoute path="/projects/:id">
          <InterviewPageContainer />
        </AuthRoute>
        <AuthRoute path="/result/:projectId">
          <TotalResultContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewContainerHelper />
        </AuthRoute>
        <AuthRoute path="/search">
          <Dummy />
        </AuthRoute>
        <Route path="/voiceTest">
          <VoiceToTextTestPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
}
