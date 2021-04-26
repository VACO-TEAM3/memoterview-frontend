import { Redirect, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import InterviewContainerHelper from "../../containers/interviewContainerHelper";
import IntervieweeDetailContainer from "../../containers/IntervieweeDetailContainer";
import IntervieweePageContainer from "../../containers/IntervieweePageContainer";
import InterviewPageContainer from "../../containers/InterviewPageContainer";
import LoginPageContainer from "../../containers/LoginPageContainer";
import ProjectsContainer from "../../containers/ProjectsContainer";
import TotalResultContainer from "../../containers/TotalResultContainer";
import WelcomeContainer from "../../containers/WelcomeContainer";
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
        <Route path="/welcome/:projectId/:intervieweeId" >
          <WelcomeContainer />
        </Route>
        <AuthRoute path="/projects" exact>
          <ProjectsContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewPageContainer />
        </AuthRoute>
        <AuthRoute path="/interviewee/:projectId/:intervieweeId">
          <IntervieweePageContainer />
        </AuthRoute>
        <AuthRoute path="/projects/:projectId" exact>
          <TotalResultContainer />
        </AuthRoute>
        <AuthRoute path="/result/:intervieweeId">
          <IntervieweeDetailContainer />
        </AuthRoute>
        <AuthRoute path="/search">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/projects/:projectId/search">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/projects/:projectId/result/:intervieweeId">
          <IntervieweeDetailContainer />
        </AuthRoute>
        <AuthRoute path="/voiceTest">
          <VoiceToTextTestPage />
        </AuthRoute>
        <AuthRoute path="/voiceTest">
          <VoiceToTextTestPage />
        </AuthRoute>
        <AuthRoute path="/testInterview">
          <Dummy />
        </AuthRoute>
        <Redirect to="/" />
      </Switch>
    </ThemeProvider>
  );
}
