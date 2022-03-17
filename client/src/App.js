import { Routes, Route } from 'react-router-dom';
// 로그인, 회원가입
import Login from './components/authentication/Login';
import Join from './components/authentication/Join';

//메인 페이지
import Home from './pages/Home';

// 마이페이지
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import MyPageLayout from './layout/MyPageLayout';

// 게시물 페이지
import Mypost from './pages/MyPost';
import { PostContainer, MiniPostContainer } from './components/Post';
import PostPage from './pages/PostPage';
import DetailPost from './pages/DetailPost';
import UsedTrade from './pages/UsedTrade';

// 채팅 페이지
import Chatting from './pages/Chatting';

//매칭페이지
import MatchingPageLayout from './layout/FindingMatesLayout';
import MatchingListsContainer from './redux/containers/MatchingListsContainer';
import WriteMatchingPost from './pages/findingMates/MatchingRegisterForm';
import MatchingPostContainer from './redux/containers/MatchingPostContainer';

//중고장터페이지
import MarketPageLayout from './layout/MarketLayout';
import MarketListsContainer from './redux/containers/MarketListsContainer';
import WriteMarketgPost from './pages/usedMarket/ItemRegisterForm';
import MarketPostContainer from './redux/containers/MarketPostContainer';

import axios from 'axios';
import { useState, useEffect } from 'react';

import MyPetListsContainer from './redux/containers/MyPetListsContainer';
import InterestedPost from './pages/InterestedPost';

const App = () => {
  const [userInfo, setUserInfo] = useState({
    auth: false,
    userId: '',
    userNick: '',
    userEmail: '',
    userName: '',
    region1: '',
    region2: '',
    region3: '',
  });
  console.log(userInfo, '33333333333333333333333');

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      const tokenValidationResponse = await axios({
        url: 'http://localhost:3001/auth/auth',
        method: 'get',
        headers: { 'x-access-token': localStorage.getItem('token') },
      });
      console.log(tokenValidationResponse, 'tokenValidResponse');
      userInfoHandler(tokenValidationResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const userInfoHandler = ({ data }) => {
    setUserInfo((prevState) => {
      console.log('ssss', data);
      return {
        ...prevState,
        auth: data.auth,
        userId: data.userId,
        userEmail: data.userEmail,
        userNick: data.userNick,
        userPhone: data.userPhone,
        userName: data.userName,
        info: data.info,
        // 우편, 주소, 상세주소
        zonecode: data.zonecode,
        address: data.address,
        detailAddress: data.detailAddress,
        commentId: data.commentId,
        region1: data.region1,
        region2: data.region2,
        region3: data.region3,
        balance: data.balance,
        deleted: data.deleted,
        //필요한 유저 정보 이곳에다가 추가(백엔드 authController에서도 추가해야함)
      };
    });
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login userInfoHandler={userInfoHandler} />}
      />
      <Route path="/join" element={<Join />} />
      <Route path="/" element={<Home userInfo={userInfo} />} />

      {/* 일반게시물 페이지 */}
      <Route path="board" element={<PostPage userInfo={userInfo} />} />
      <Route
        path="board/:boardId"
        element={<DetailPost userInfo={userInfo} />}
      />
      <Route path="/usedtrade" element={<UsedTrade />} />
      <Route path="/chatting" element={<Chatting userInfo={userInfo} />} />

      {/* 매칭페이지 */}
      <Route path="match" element={<MatchingPageLayout />}>
        <Route
          path="list"
          element={<MatchingListsContainer userInfo={userInfo} />}
        />
        <Route
          path="detail/:matchId"
          element={<MatchingPostContainer userInfo={userInfo} />}
        />
        <Route path="add" element={<WriteMatchingPost userInfo={userInfo} />} />
      </Route>

      {/* 중고장터 페이지 */}
      <Route path="market" element={<MarketPageLayout />}>
        <Route
          path="list"
          element={<MarketListsContainer userInfo={userInfo} />}
        />
        <Route
          path="detail/:marketId"
          element={<MarketPostContainer userInfo={userInfo} />}
        />
        <Route path="add" element={<WriteMarketgPost />} />
      </Route>

      <Route element={<MyPageLayout userInfo={userInfo} />}>
        <Route path="/mypost/" element={<Mypost userInfo={userInfo} />} />
        <Route
          path="/mypet/"
          element={<MyPetListsContainer userInfo={userInfo} />}
        />
        <Route
          path="/interestingpost/"
          element={<InterestedPost userInfo={userInfo} />}
        />
        <Route
          path="/profile/"
          element={<Profile userInfoProps={userInfo} />}
        />
        <Route
          path="/profileUpdate/"
          element={<ProfileUpdate userInfoProps={userInfo} />}
        />
        {/* <Route path="profile/:username" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
