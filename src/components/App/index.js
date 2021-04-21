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
<<<<<<< HEAD
      <Switch>
        <Route path="/" exact>
          <LoginPageContainer />
        </Route>
        <Route path="/welcome/:projectId/:intervieweeId" >
          <WelcomeContainer />
        </Route>
        <AuthRoute path="/projects">
          <ProjectsContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewPageContainer />
        </AuthRoute>
        <AuthRoute path="/interviewee">
          <IntervieweePageContainer />
        </AuthRoute>
        <AuthRoute path="/projects/:projectId">
          <TotalResultContainer />
        </AuthRoute>
        <AuthRoute path="/result/:intervieweeId">
          <IntervieweeDetailContainer />
        </AuthRoute>
        <AuthRoute path="/interview/:projectId/:intervieweeId">
          <InterviewContainerHelper />
        </AuthRoute>
        <AuthRoute path="/search">
          <Dummy />
        </AuthRoute>
        <AuthRoute path="/voiceTest">
          <VoiceToTextTestPage />
        </AuthRoute>
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
