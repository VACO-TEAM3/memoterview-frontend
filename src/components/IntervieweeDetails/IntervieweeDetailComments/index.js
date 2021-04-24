import React from "react";
import styled from "styled-components";

import IntervieweeDetailUserInfo from "../IntervieweeDetailUserInfo";

const Comments = styled.div`
  display: flex;
  width: 80vw;
`;

function IntervieweeDetailComments({ comments }) {
  return (
    <Comments>
      <div>
        {
          comments ?
            comments.map(comment =>
              <>
                <IntervieweeDetailUserInfo commenterInfo={comment.commenter}/>
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
