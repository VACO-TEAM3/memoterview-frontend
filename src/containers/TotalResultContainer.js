import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

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
        projectId={projectId}
        onIntervieweeAddBtnClick={handleIntervieweeAddBtnClick}
        interviewees={waitingInterviewees}
        resultInterviewees={resultInterviewees}
        onLogoutClick={handleLogoutClick}
      />
    </>
  );
}
