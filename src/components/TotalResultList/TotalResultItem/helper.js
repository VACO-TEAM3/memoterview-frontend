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
      return getAverages(interviewee.comments);
    case FILTER_TYPES.INTERVIEWEE:
      return interviewee.name;
    case FILTER_TYPES.QUESTION_SCORE:
      return getAverages(interviewee.questions);
    case FILTER_TYPES.QUESTION_NUM:
      return interviewee.questions.length;
    case FILTER_TYPES.INTERVIEW_DURATION:
      return interviewee.interviewDuration;
    case FILTER_TYPES.INTERVIEW_DATE:
      return interviewee.interviewDate;
    default: // custom filter
      return interviewee.filterScores
        ? getAverages(interviewee.filterScores[columnItem])
        : 0;
  }
}
