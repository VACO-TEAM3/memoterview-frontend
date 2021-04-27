import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { faAngleLeft, faAngleRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styled from "styled-components";

import ModalView from "../ModalView";

const IndicatorGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;
  margin-top: 50px;
`;

const DownloadPdfBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0;
`;

const DownloadPdfButton = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
  font-size: 25px;
  cursor: pointer;
`;

const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
  width:20%;
  height: 25px;
  font-size: 15px;
  cursor: pointer;
`;

const PageNumberText = styled.p`
  font-size: 15px;
`;

export default function IntervieweeResumeModalView({ resume }) {
  // pdf를 위해 필요한 값
  //: 리덕스에서 interviewee 정보에서(id로 찾아야겠지..) resumePath --> 아래 Document file에 꼽아주면 된다

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleDownloadPdfBtnClick(e) {
    e.preventDefault();
    window.open(`${resume}`, "_blank");
  }

  function handlePrevBtnClick(e) {
    e.preventDefault();

    if (pageNumber <= 1) {
      return;
    }

    setPageNumber(pageNumber - 1);
  }

  function handleNextBtnClick(e) {
    e.preventDefault();

    if (pageNumber >= numPages) {
      return;
    }

    setPageNumber(pageNumber + 1);
  }

  return (
    <ModalView padding="20px 10px 0 10px" width="600px" height="600px">
      <DownloadPdfBtnWrap>
        <DownloadPdfButton onClick={handleDownloadPdfBtnClick}>
          <FontAwesomeIcon icon={faDownload}/>
        </DownloadPdfButton>
      </DownloadPdfBtnWrap>
      <Document
        file={resume}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <IndicatorGroup>
        <PageIndicator onClick={handlePrevBtnClick}><FontAwesomeIcon icon={faAngleLeft}/></PageIndicator>
        <PageNumberText>
          Page {pageNumber} of {numPages}
        </PageNumberText>
        <PageIndicator onClick={handleNextBtnClick}><FontAwesomeIcon icon={faAngleRight}/></PageIndicator>
      </IndicatorGroup>
    </ModalView>
  );
};
