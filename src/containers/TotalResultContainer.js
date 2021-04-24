import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import IntervieweeAddModalView from "../components/IntervieweeAddModalView";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import useToken from "../hooks/useToken";
import TotalResult from "../pages/TotalResult";
import { addNewInterviewee, extractIntervieweesByInterviewed, getInterviewees, intervieweeIdsToByIdObjs } from "../redux/reducers/interviewee";

export default function TotalResultContainer() {
  const [modalFlag, setModalFlag] = useState(false);
  const { projectId } = useParams();
  const { token } = useToken();
  const dispatch = useDispatch();
  const {
    interviewees: {
      loading,
      byId,
      allIds,
    },
  } = useSelector(({ projects, interviewees }) => ({ projects, interviewees }));

  const interviewees = intervieweeIdsToByIdObjs(allIds, byId);
  const { waitingInterviewees, resultInterviewees } = extractIntervieweesByInterviewed(interviewees);

  useEffect(() => {
    dispatch(getInterviewees({ token, projectId }));
  }, [dispatch, projectId, token]);

  function handleIntervieweeAddBtnClick() {
    console.log("click interviewee add button");
    openAddIntervieweeModal();
  }

  function closeAddIntervieweeModal() {
    setModalFlag(false);
  }

  function openAddIntervieweeModal() {
    setModalFlag(true);
  }

  async function handleFormSubmitBtnClick({ pdf, intervieweeInfo }){
    try {
      console.log(pdf, intervieweeInfo);
      const result = await dispatch(addNewInterviewee({ token, projectId, pdf, intervieweeInfo }));
      console.log("returned", result);
      closeAddIntervieweeModal();
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <>
      {loading && <Loading />}
      {modalFlag && (
        <Modal onBackgroundClick={closeAddIntervieweeModal}>
          <IntervieweeAddModalView
            onCancleBtnClick={closeAddIntervieweeModal}
            onFormSubmitBtnClick={handleFormSubmitBtnClick}
          />
        </Modal>
      )}
      <TotalResult onIntervieweeAddBtnClick={handleIntervieweeAddBtnClick} interviewees={waitingInterviewees}/>
    </>
  );
};
