import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

import { requestSendEmailToInterviewee } from "../api";
import IntervieweeAddModalView from "../components/IntervieweeAddModalView";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import useToken from "../hooks/useToken";
import TotalResult from "../pages/TotalResult";
import {
  addNewInterviewee,
  extractIntervieweesByInterviewed,
  getInterviewees,
  intervieweeIdsToByIdObjs,
} from "../redux/reducers/interviewee";

export default function TotalResultContainer() {
  const [modalFlag, setModalFlag] = useState(false);
  const { projectId } = useParams();
  const { token } = useToken();
  const dispatch = useDispatch();

  const { loading, error, interviewees } = useSelector(
    ({ interviewees: { loading, error, byId, allIds } }) => ({
      loading,
      error,
      interviewees: intervieweeIdsToByIdObjs(allIds, byId),
    })
  );

  const {
    waitingInterviewees,
    resultInterviewees,
  } = extractIntervieweesByInterviewed(interviewees);

  useEffect(() => {
    dispatch(getInterviewees({ token, projectId }));
  }, [dispatch, projectId, token]);

  function handleIntervieweeAddBtnClick() {
    openAddIntervieweeModal();
  }

  function handleIntervieweeDeleteBtnClick({ intervieweeId }) {
    console.log("item delete", intervieweeId);
  }

  function closeAddIntervieweeModal() {
    setModalFlag(false);
  }

  function openAddIntervieweeModal() {
    setModalFlag(true);
  }

  function handleIntervieweeAddSubmit({ pdf, intervieweeInfo }) {
    dispatch(
      addNewInterviewee({ token, projectId, pdf, intervieweeInfo })
    );
    closeAddIntervieweeModal();
  }

  function handleLogoutClick() {
    console.log("logoutClick");
  }

  function handleIntervieweeInviteBtnClick({ intervieweeId, intervieweeEmail }) {
    console.log("Invite interviewee", intervieweeId);
    const interviewRoomLink = `${window.location.origin}/welcome/${projectId}/${intervieweeId}`;
    console.log(interviewRoomLink);

    try {
      requestSendEmailToInterviewee({ token, projectId, intervieweeEmail, interviewRoomLink });
    } catch (error){
      console.error(error);
    }
  }

  function handleInterviewRoomEnterBtnClick({ intervieweeId }) {
    console.log("enter interview room", intervieweeId);
  }

  return (
    <>
      {loading && <Loading />}
      {modalFlag && (
        <Modal onBackgroundClick={closeAddIntervieweeModal}>
          <IntervieweeAddModalView
            onCancleBtnClick={closeAddIntervieweeModal}
            onFormSubmitBtnClick={handleIntervieweeAddSubmit}
          />
        </Modal>
      )}
      <TotalResult
        interviewees={waitingInterviewees}
        resultInterviewees={resultInterviewees}
        projectId={projectId}
        onIntervieweeAddBtnClick={handleIntervieweeAddBtnClick}
        onIntervieweeDeleteBtnClick={handleIntervieweeDeleteBtnClick}
        onIntervieweeInviteBtnClick={handleIntervieweeInviteBtnClick}
        onInterviewRoomEnterBtnClick={handleInterviewRoomEnterBtnClick}
        onLogoutClick={handleLogoutClick}
      />
    </>
  );
}
