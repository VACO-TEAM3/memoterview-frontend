import "react-calendar/dist/Calendar.css";

import { format } from "date-fns";
import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

const TotalResultCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .react-calendar {
    width: 100%;
    height: 100%;
  }

  .react-calendar__navigation {
    height: 30px;
  }

  .react-calendar__navigation__label,
  .react-calendar__navigation__arrow,
  .react-calendar__month-view__weekdays {
    color: ${({ theme }) => theme.SpanishBlue};
  }

  .react-calendar__navigation {
    background-color: #EBEBEB;
  }

  .react-calendar__month-view__days__day {
    color: ${({ theme }) => theme.LittleBoyBlue};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${({ theme }) => theme.ModalBackground};
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.CongoPink};
  }

  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }

  .react-calendar__tile {
    padding: 12px 10px;
  }
`;

export default function Calendar() {
  return (
    <TotalResultCalendarWrapper>
      <ReactCalendar
        calendarType="US"
        formatDay={(locale, date) => format(date, "d")}
        formatMonthYear	={(locale, date) => format(date, "MMMM dd yyyy")}
      />
    </TotalResultCalendarWrapper>
  );
}
