import React from 'react';
import './MyPageStyle.css';
import styled from 'styled-components';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableContainer from './admin/TableContainer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DeliveryTableContainer from './admin/DeliveryTableContainer';

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
    max-height: fit-content;
    max-height: 1000px;
  }
  header {
    text-align: right;
    border-bottom: 1px solid black;
    height: 55px;
    display: flex;
    justify-content: space-between;

    button {
      height: fit-content;
    }
    p {
      margin-top: 15px;
      font-size: 20px;
    }
  }
`;

const TableHeaderStyle = styled.div`
  .co {
    text-align: center;
    font-size: 13px;
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
  }
  .ct4 {
    grid-area: ct4;
  }
  .ct5 {
    grid-area: ct5;
  }
  .ct6 {
    grid-area: ct6;
  }
  .sort-btn {
    color: var(--font-light);
    margin-left: 5px;
    padding: 0 3px;
    cursor: pointer;
  }
`;

const DeliveryTableStyle = styled.div`
  .co {
    text-align: center;
    font-size: 13px;
    line-height: 30px;
    width: 100%;
    height: 30px;
    display: grid;
    background-color: var(--bgcolor-default);
    grid-template-columns: 80px 1fr 1.5fr 1fr 1.5fr;
    grid-template-rows: 30px;
    grid-template-areas: ' ct2 ct3 ct4 ct5 ct6';
    border-bottom: 1px solid var(--bordercolor-default);
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
  .ct6 {
    grid-area: ct6;
  }
  .sort-btn {
    color: var(--font-light);
    margin-left: 5px;
    padding: 0 3px;
    cursor: pointer;
  }

  .no-access {
  }
`;

const AdminPage = ({ userInfoProps }) => {
  const [deliveryArr, setDeliveryArr] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/market/delivery`).then((res) => {
      setDeliveryArr(res.data);
    });
  }, []);

  console.log('?????????????????? ????????????', userInfoProps);

  const userRole = userInfoProps.userNick;

  return (
    <AdminPageStyle>
      <div className="admin-wrapper">
        {userInfoProps && userRole === '?????????' ? (
          <>
            <div className="cont">
              <header>
                <p>????????????</p>
                {/* <button className="btn__st">????????????</button> */}
              </header>
              <DeliveryTableStyle>
                <div className="co">
                  <div className="ct2">
                    ????????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct3">
                    ????????? ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct4">
                    ????????? ??????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct5">
                    ????????? ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct6">
                    ????????? ??????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                </div>
              </DeliveryTableStyle>
              {deliveryArr.map((item) => (
                <DeliveryTableContainer
                  col1={item.marketId}
                  col2={item.userId}
                  col3={item.userAddress}
                  col4={item.sellerId}
                  col5={item.sellerAddress}
                />
              ))}
            </div>

            <div className="cont">
              <header>
                <p>????????? ????????? ??????</p>
                <button className="btn__st">????????????</button>
              </header>
              <TableHeaderStyle>
                <div className="co">
                  <div className="ct1">??????</div>
                  <div className="ct2">
                    ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct3">
                    ????????? ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct4">
                    ?????? ??????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct5">
                    ????????? ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct6">
                    ????????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                </div>
              </TableHeaderStyle>
              <TableContainer
                col1="1"
                col2="abc100"
                col3="22-03-19"
                col4="sellerking"
                col5="?????????"
              />
            </div>

            <div className="cont">
              <header>
                <p>????????? ?????? ??????</p>
                <button className="btn__st">????????????</button>
              </header>
              <TableHeaderStyle>
                <div className="co">
                  <div className="ct1">??????</div>
                  <div className="ct2">
                    ????????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct3">
                    ????????? ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct4">
                    ?????? ??????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct5">
                    ????????? ?????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                  <div className="ct6">
                    ????????????
                    <FontAwesomeIcon icon={faSort} className="sort-btn" />
                  </div>
                </div>
              </TableHeaderStyle>
              <TableContainer
                col1="1"
                col2="abc100"
                col3="22-03-19"
                col4="sellerking"
                col5="?????????"
              />
            </div>
          </>
        ) : (
          <h1 className="no-access">????????? ??? ?????? ??????????????????.</h1>
        )}
      </div>
    </AdminPageStyle>
  );
};

export default AdminPage;
