import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faCircleUser,
  faHouse,
  faMagnifyingGlass,
  faMessage,
  faPeopleCarryBox,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderStyle = Styled.div`
  .header-container {
  width: 800px;
  height: 50px;
  line-height: 50px;
  background-color: #ffffff;
  box-shadow: 10px 10px 20px #e9e9e9, -10px -10px 20px #f0f0f0;
  border-radius: 5px;
  margin: 20px auto 20px auto;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  }
  .header-logo-container {
    width: 100px;
    height: 50px;
  }
  .header-logo-container img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  #header-search-icon,
  #header-home-icon,
  #header-post-icon,
  #header-mathching-icon,
  #header-market-icon,
  #header-mypage-icon {
    font-size: 22px;
    margin: 15px 7px 0 7px;
    color: var(--font-dark);
    cursor: pointer;
    transition: 0.3s;
  }
  #header-search-icon:hover,
  #header-home-icon:hover,
  #header-post-icon:hover,
  #header-mathching-icon:hover,
  #header-market-icon:hover,
  #header-mypage-icon:hover {
    color: var(--accent-default);
  }

  .main-search {
    position: relative;
    bottom: 3px;
    width: 200px;
    height: 30px;
    margin: 0 10px 0 0;
    padding: 0 40px 0 10px;
    border: 1px solid white;
    background-color: var(--bgcolor-default);
    transition: 0.3s;
  }
  .main-search:focus {
    border: 1px solid var(--accent-default);
    background-color: white;
  }
  .main-search-btn{
    position: absolute;
    transform: translate(-45px,17px);
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;
    line-height: normal;
  }
  .drop-menu{
    display: inline-block;
    top: 65px;
    transform: translate(-77.2px);
    position: absolute;
    width: fit-content;
    height: fit-content;
    background-color: white;
    padding: 5px 10px ;
    text-align: center;
    box-shadow: 0 10px 7px #e4e4e467; 
  }
  .drop-menu > p{
    line-height: 28px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s;
  }
  .drop-menu > p:hover{
    color: var(--accent-default);
  }
  .header-icons-container{
    display: relative;
  }
`;

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const clickSearch = (e) => {
    setShowSearchBar(!showSearchBar);
  };

  const [showDropMenu, setShowDropMenu] = useState(false);

  const clickSearchBtn = (e) => {
    alert('검색합니다');
  };

  return (
    <>
      <HeaderStyle>
        <div className="header-container">
          <div className="header-logo-container">
            <img src={process.env.PUBLIC_URL + 'img/LogoHorizon.png'} />
          </div>

          <div className="header-icons-container">
            {showSearchBar ? (
              <>
                <input
                  className="main-search"
                  type="text"
                  placeholder="검색하기..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      clickSearchBtn();
                      e.target.value = '';
                    }
                  }}
                />
                <span className="main-search-btn" onClick={clickSearchBtn}>
                  검색
                </span>
              </>
            ) : null}

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              id="header-search-icon"
              title="검색"
              onClick={clickSearch}
            />
            <Link to="/">
              <FontAwesomeIcon
                icon={faHouse}
                id="header-home-icon"
                title="홈으로"
              />
            </Link>
            <Link to="/postpage">
              <FontAwesomeIcon
                icon={faCameraRetro}
                id="header-post-icon"
                title="게시물"
              />
            </Link>
            <FontAwesomeIcon
              icon={faUserGroup}
              id="header-mathching-icon"
              title="산책메이트 찾기"
            />
            <FontAwesomeIcon
              icon={faPeopleCarryBox}
              id="header-market-icon"
              title="중고거래"
            />

            <FontAwesomeIcon
              icon={faMessage}
              id="header-chatting-icon"
              title="채팅보기"
            />

            <FontAwesomeIcon
              icon={faCircleUser}
              id="header-mypage-icon"
              title="마이페이지"
              onClick={() => {
                setShowDropMenu(!showDropMenu);
              }}
            />
            {showDropMenu ? (
              <div className="drop-menu">
                <p>
                  <Link to="/mypost">마이페이지</Link>
                </p>
                <p>
                  <Link to="/login">로그아웃</Link>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </HeaderStyle>
    </>
  );
};

export default Header;
