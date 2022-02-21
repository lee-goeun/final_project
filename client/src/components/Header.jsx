import './Header.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faCircleUser,
  faHouse,
  faMagnifyingGlass,
  faPeopleCarryBox,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const clickSearch = (e) => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <div className="header-container">
        <div className="header-logo-container">
          <img src={process.env.PUBLIC_URL + 'img/LogoHorizon.png'} />
        </div>

        <div>
          {showSearchBar ? (
            <input className="main-search" type="text" placeholder="검색하기" />
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
          <Link to="/post">
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
          />
        </div>
      </div>
    </>
  );
};

export default Header;
