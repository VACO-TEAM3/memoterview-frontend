import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";

import ModalView from "../ModalView";

const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  margin: 20px;
`;

const ClosingBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
`;

const ClosingButton = styled.button`
  display: flex;
  justify-content: center;
  width: 10%;
  cursor: pointer;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  margin: 10px;
  width:20%;
  height: 25px;
  cursor: pointer;
`;

const PageNumberText = styled.p`
  font-size: 15px;
`;

export default function IntervieweeResumeModalView({ onCancleBtnClick }) {
  // pdf를 위해 필요한 값
  //: 리덕스에서 interviewee 정보에서(id로 찾아야겠지..) resumePath --> 아래 Document file에 꼽아주면 된다

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // 페이지 넘버에 따라 ui 바꿀것인지?
  function handlePrevBtnClick(e) {
    e.preventDefault();

    if (pageNumber <= numPages) {
      console.log("first page");
      return;
    }

    setPageNumber(pageNumber - 1);
  }

  function handleNextBtnClick(e) {
    e.preventDefault();

    if (pageNumber >= numPages) {
      console.log("finished");
      return;
    }

    setPageNumber(pageNumber + 1);
  }

  return (
    <ModalView padding="5px" width="700px" height="900px">
      <ClosingBtnWrap>
        <ClosingButton onClick={onCancleBtnClick}>취소</ClosingButton>
      </ClosingBtnWrap>
      <Document
        file="https://memoterview.s3.ap-northeast-2.amazonaws.com/96a66e65e623a6f4c17dba23f69901a0"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <BtnGroup>
        <Button onClick={handlePrevBtnClick}>Previous</Button>
        <PageNumberText>
          Page {pageNumber} of {numPages}
        </PageNumberText>
        <Button onClick={handleNextBtnClick}>Next</Button>
      </BtnGroup>
    </ModalView>
  );
};
