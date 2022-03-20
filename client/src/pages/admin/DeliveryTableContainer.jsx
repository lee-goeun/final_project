import React from 'react';
import styled from 'styled-components';

const DeliveryTableContainerStyle = styled.div`
  .co {
    text-align: center;
    font-size: 13px;
    line-height: 30px;
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 80px 1fr 1.5fr 1fr 1.5fr;
    grid-template-rows: 30px;
    grid-template-areas: 'ct1 ct2 ct3 ct4 ct5';
    border-bottom: 1px solid var(--bordercolor-default);
  }
  .ct1 {
    grid-area: ct1;
  }
  .ct2 {
    grid-area: ct2;
  }
  .ct3 {
    grid-area: ct3;
  }
  .ct4 {
    grid-area: ct4;
  }
  .ct5 {
    grid-area: ct5;
  }
  .sort-btn {
    color: var(--font-light);
    margin-left: 5px;
    padding: 0 3px;
    cursor: pointer;
  }
`;

const DeliveryTableContainer = ({ col1, col2, col3, col4, col5 }) => {
  return (
    <DeliveryTableContainerStyle>
      <div className="co">
        <div className="ct1">{col1}</div>
        <div className="ct2">{col2}</div>
        <div className="ct3">{col3}</div>
        <div className="ct4">{col4}</div>
        <div className="ct5">{col5}</div>
      </div>
    </DeliveryTableContainerStyle>
  );
};

export default DeliveryTableContainer;
