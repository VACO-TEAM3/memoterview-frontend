import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Comments = styled.div`
  display: flex;
  width: 80vw;
  background-color: whitesmoke;
`;

function IntervieweeDetailComments({ comments }) {
  return (
    <Comments>
      <div>
        {
          comments.length ?
            comments.map(comment =>
              <>
                <IntervieweeDetailUserInfo userInfo={comment.commentor}/>
                <ul>
                  <li>총평: {comment.score}</li>
                  <li>코멘트: {comment.comment}</li>
                </ul>
              </>
            )
            : "No comments"
        }
      </div>
    </Comments>
  );
}

export default IntervieweeDetailComments;
