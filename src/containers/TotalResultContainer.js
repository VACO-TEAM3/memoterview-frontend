import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";

import { requestSendEmailToInterviewee } from "../api";
import IntervieweeAddModalView from "../components/IntervieweeAddModalView";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import TotalResultFilterModalView from "../components/TotalResultFilterModalView";
import useToken from "../hooks/useToken";
import TotalResult from "../pages/TotalResult";
import {
  addNewInterviewee,
  deleteInterviewee,
  extractIntervieweesByInterviewed,
  getInterviewees,
  intervieweeIdsToByIdObjs,
} from "../redux/reducers/interviewee";
import { getInterviewRoomLink, getWelcomLink } from "../utils/path";

const MODAL_TYPE = {
  ADD: "add",
  FILTER: "filter",
};

export default function TotalResultContainer() {
  const [modalType, setModalType] = useState(null);
  const { projectId } = useParams();
  const { token } = useToken();
  const history = useHistory();
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
    dispatch(deleteInterviewee({ projectId, intervieweeId, token }));
  }

  function closeModal() {
    setModalType(null);
  }

  function openAddIntervieweeModal() {
    setModalType(MODAL_TYPE.ADD);
  }

  function handleIntervieweeAddSubmit({ pdf, intervieweeInfo }) {
    dispatch(addNewInterviewee({ token, projectId, pdf, intervieweeInfo }));
    closeModal();
  }

  function handleLogoutClick() {
    console.log("logoutClick");
  }

  function handleIntervieweeInviteBtnClick({
    intervieweeId,
    intervieweeEmail,
  }) {
    const welcomePageLink = getWelcomLink({ intervieweeId, projectId });

    try {
      requestSendEmailToInterviewee({
        token,
        projectId,
        intervieweeId,
        intervieweeEmail,
        welcomePageLink,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function handleInterviewRoomEnterBtnClick({ intervieweeId }) {
    const interviewRoomLink = getInterviewRoomLink({
      intervieweeId,
      projectId,
    });
    history.push(interviewRoomLink);
  }

  function handleFilterBtnClick() {
    setModalType(MODAL_TYPE.FILTER);
  }

  return (
    <>
      {loading && <Loading />}
      {modalType && (
        <Modal onBackgroundClick={closeModal}>
          {modalType === MODAL_TYPE.ADD && (
            <IntervieweeAddModalView
              onCancleBtnClick={closeModal}
              onFormSubmitBtnClick={handleIntervieweeAddSubmit}
            />
          )}
          {modalType === MODAL_TYPE.FILTER && (
            <TotalResultFilterModalView onCancleBtnClick={closeModal}/>
          )}
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
        onFilterBtnClick={handleFilterBtnClick}
      />
    </>
  );
}
