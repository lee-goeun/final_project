import Styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faCircleUser,
  faHouse,
  faMagnifyingGlass,
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
    padding: 0 10px;
    border: 1px solid white;
    background-color: var(--bgcolor-default);
    transition: 0.3s;
  }
  .main-search:focus {
    border: 1px solid var(--accent-default);
    background-color: white;
  }
`;

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const clickSearch = (e) => {
    setShowSearchBar(!showSearchBar);
  };

  const [showDropMenu, setShowDropMenu] = useState(false);

  return (
    <>
      <HeaderStyle>
        <div className="header-container">
          <div className="header-logo-container">
            <img src={process.env.PUBLIC_URL + 'img/LogoHorizon.png'} />
          </div>

          <div>
            {showSearchBar ? (
              <input
                className="main-search"
                type="text"
                placeholder="검색하기"
              />
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
              icon={faCircleUser}
              id="header-mypage-icon"
              title="마이페이지"
              onClick={() => {
                setShowDropMenu(!showDropMenu);
              }}
            />
            {showDropMenu ? (
              <div>
                <p>로그아웃</p>
              </div>
            ) : null}
          </div>
        </div>
      </HeaderStyle>
    </>
  );
};

export default Header;
