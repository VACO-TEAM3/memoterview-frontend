import { changeDateFormat } from "../../../utils/date";
import { FILTER_TYPES } from "../../../utils/filters";

function getAverages(scroes) {
  return scroes
    ? scroes.reduce(
      (acc, score) =>
        typeof score === "object" ? acc + score.score : acc + score,
      0
    ) / scroes.length
    : 0;
}

export function mappedFilterValue({ interviewee, columnItem }) {
  switch (columnItem) {
    case FILTER_TYPES.EVALUATION:
      return interviewee.commentAvgScore;
    case FILTER_TYPES.INTERVIEWEE:
      return interviewee.name;
    case FILTER_TYPES.QUESTION_SCORE:
      return interviewee.questionAvgScore;
    case FILTER_TYPES.QUESTION_NUM:
      return interviewee.questionsNum;
    case FILTER_TYPES.INTERVIEW_DURATION:
      return interviewee.interviewDuration;
    case FILTER_TYPES.INTERVIEW_DATE:
      return changeDateFormat(interviewee.interviewDate, "yyyy-MM-dd");
    default: // custom filter
      return interviewee.filterAvgScores
        ? interviewee.filterAvgScores[columnItem] && 0
        : 0;
  }
}
