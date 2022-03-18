import React from 'react';
import './MyPageStyle.css';
import styled from 'styled-components';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableContainer from './admin/TableContainer';

const AdminPageStyle = styled.div`
  .admin-wrapper {
    margin-left: 30px;
    margin-top: 5px;
    width: 900px;
    min-height: 1000px;
    max-height: 1200px;
    padding: 30px;
    background-color: white;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);
    border-radius: 10px;
    overflow-y: auto;
  }
  .cont {
    margin: 30px auto;
    width: 95%;
    min-height: fit-content;
    height: 1000px;
    max-height: 1000px;
  }
  header {
    text-align: right;
    border-bottom: 1px solid black;
    height: 55px;

    button {
      margin-right: 10px;
    }
  }
`;

const TableHeaderStyle = styled.div`
  .co {
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    width: 100%;
    height: 30px;
    display: grid;
    background-color: var(--bgcolor-default);
    grid-template-columns: 50px 80px 1fr 1fr 1fr 1fr;
    grid-template-rows: 30px;
    grid-template-areas: 'ct1 ct2 ct3 ct4 ct5 ct6';
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
    /* background-color: rgb(230, 230, 230); */
  }
  .ct4 {
    grid-area: ct4;
    /* background-color: rgb(230, 230, 230); */
  }
  .ct5 {
    grid-area: ct5;
    /* background-color: rgb(245, 245, 245); */
  }
  .ct6 {
    grid-area: ct6;
    /* background-color: rgb(245, 245, 245); */
  }
  .sort-btn {
    color: var(--font-light);
    margin-left: 5px;
    padding: 0 3px;
    cursor: pointer;
  }
`;

const AdminPage = () => {
  return (
    <AdminPageStyle>
      <div className="admin-wrapper">
        <div className="cont">
          <header>
            <button className="btn__st">기능버튼</button>
          </header>
          <TableHeaderStyle>
            <div className="co">
              <div className="ct1">체크</div>
              <div className="ct2">
                물품번호
                <FontAwesomeIcon icon={faSort} className="sort-btn" />
              </div>
              <div className="ct3">
                구매자 아이디
                <FontAwesomeIcon icon={faSort} className="sort-btn" />
              </div>
              <div className="ct4">
                구매자 주소
                <FontAwesomeIcon icon={faSort} className="sort-btn" />
              </div>
              <div className="ct5">
                판매자 아이디
                <FontAwesomeIcon icon={faSort} className="sort-btn" />
              </div>
              <div className="ct6">
                판매자 주소
                <FontAwesomeIcon icon={faSort} className="sort-btn" />
              </div>
            </div>
          </TableHeaderStyle>
          <TableContainer
            prdno="1"
            buyerID="abc100"
            buyerAddr="경기도 안양시"
            sellerId="sellerking"
            sellerAddr="서울시 논현동"
          />
        </div>
      </div>
    </AdminPageStyle>
  );
};

export default AdminPage;