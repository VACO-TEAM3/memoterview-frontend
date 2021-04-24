import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import TotalResultIntervieweeColumn from "../TotalResultIntervieweeColumn";
import TotalResultIntervieweeRow from "../TotalResultIntervieweeRow";

export default function TotalResultIntervieweeItem({ interviewee }) {
  return (
    <TotalResultIntervieweeRow>
      <TotalResultIntervieweeColumn>{interviewee.name}</TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>{interviewee.email}</TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn></TotalResultIntervieweeColumn>
      <TotalResultIntervieweeColumn>
        <FontAwesomeIcon icon={faTimes} />
      </TotalResultIntervieweeColumn>
    </TotalResultIntervieweeRow>
  );
}
