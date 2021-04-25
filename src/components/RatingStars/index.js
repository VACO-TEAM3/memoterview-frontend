import { useRef } from "react";
import styled from "styled-components";

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .rate {
    float: left;
    height: 46px;
    padding: 0 10px;
  }

  .rate:not(:checked) > input {
    position: absolute;
    top:-9999px;
  }

  .rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
  }

  .rate:not(:checked) > label:before {
    content: '★';
  }
  .rate > input:checked ~ label {
    color: #ffc700;    
  }

  .rate:not(:checked) > label:hover,
  .rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
  }

  .rate > input:checked + label:hover,
  .rate > input:checked + label:hover ~ label,
  .rate > input:checked ~ label:hover,
  .rate > input:checked ~ label:hover ~ label,
  .rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
  }
`;

export default function RatingStars({ onChange, rateOption }) {
  function handleChange({ target: { value } }) {
    onChange(value, rateOption);
  }

  return (
    <RatingWrapper>
      <div className="rate" onChange={handleChange}>
        <input type="radio" id={`star1-${rateOption}`} value="1" />
        <label htmlFor={`star1-${rateOption}`}>1 star</label>
        <input type="radio" id={`star2-${rateOption}`} value="2" />
        <label htmlFor={`star2-${rateOption}`}>2 stars</label>
        <input type="radio" id={`star3-${rateOption}`} value="3" />
        <label htmlFor={`star3-${rateOption}`}>3 stars</label>
        <input type="radio" id={`star4-${rateOption}`} value="4" />
        <label htmlFor={`star4-${rateOption}`}>4 stars</label>
        <input type="radio" id={`star5-${rateOption}`} value="5" />
        <label htmlFor={`star5-${rateOption}`}>5 stars</label>
      </div>
    </RatingWrapper>
  );
}
