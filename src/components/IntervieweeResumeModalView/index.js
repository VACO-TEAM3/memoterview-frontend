import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";

import ModalView from "../ModalView";
const BtnGroup = styled.div``;

export default function IntervieweeResumeModalView({ url, onCancleBtnClick }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // 숫자 제어하기
  function handlePrevBtnClick(e) {
    e.preventDefault();
    if (pageNumber) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleNextBtnClick(e) {
    e.preventDefault();
    if (pageNumber > numPages) {
      return;
    }
    setPageNumber(pageNumber + 1);
  }


  return (
    <ModalView padding="25px" width="700px" height="900px">
      <Document file="https://memoterview.s3.ap-northeast-2.amazonaws.com/96a66e65e623a6f4c17dba23f69901a0" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <button
        onClick={handlePrevBtnClick}
      >
        Previous
      </button>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <button
        onClick={handleNextBtnClick}
      >
        Next
      </button>

      <BtnGroup><button onClick={onCancleBtnClick}>취소</button></BtnGroup>
    </ModalView>
  );
};
