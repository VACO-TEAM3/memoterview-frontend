import styled from "styled-components";

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    display: none;
  }

  label {
    float: right;
    width: 2rem;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    font-size: 2rem;
    color: #ccc;
  }

  label:before {
    content: "★";
  }

  input:checked ~ label {
    color: #ffc700;    
  }
  
  label:hover,
  label:hover ~ label {
    color: #deb217;  
  }
  
  input:checked + label:hover,
  input:checked + label:hover ~ label,
  input:checked ~ label:hover,
  input:checked ~ label:hover ~ label,
  label:hover ~ input:checked ~ label {
    color: #c59b08;
  }
`;

export default function RatingStars({ onChange }) {
  return (
    <RatingWrapper>
      <div className="rate" onChange={onChange}>
        <input type="radio" id="star1" name="rate" value="1" />
        <label htmlFor="star1" title="text">1 star</label>
        <input type="radio" id="star2" name="rate" value="2" />
        <label htmlFor="star2" title="text">2 stars</label>
        <input type="radio" id="star3" name="rate" value="3" />
        <label htmlFor="star3" title="text">3 stars</label>
        <input type="radio" id="star4" name="rate" value="4" />
        <label htmlFor="star4" title="text">4 stars</label>
        <input type="radio" id="star5" name="rate" value="5" />
        <label htmlFor="star5" title="text">5 stars</label>
      </div>
    </RatingWrapper>
  );
}
