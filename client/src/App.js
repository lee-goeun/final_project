import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPageLayout from './layout/MyPageLayout';
import Profile from './pages/Profile';
import Mypost from './pages/MyPost';
import Login from './components/authentication/Login';
import Join from './components/authentication/Join';
import { PostContainer, MiniPostContainer } from './components/Post';
import PostPage from './pages/PostPage';
import DetailPost from './pages/DetailPost';
import Chatting from './pages/Chatting';
import UsedTrade from './pages/UsedTrade';

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

function App() {
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
      return {
        ...prevState,
        auth: data.auth,
        userId: data.userId,
        userNick: data.userNick,
        userName: data.userName,
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
      <Route path="board" element={<PostPage />} />
      <Route path="board/post/:boardId" element={<DetailPost />} />
      <Route path="/usedtrade" element={<UsedTrade />} />
      <Route path="/chatting" element={<Chatting />} />

      {/* 매칭페이지 */}
      <Route path="match" element={<MatchingPageLayout />}>
        <Route path="list" element={<MatchingListsContainer />} />
        <Route path="detail/:matchId" element={<MatchingPostContainer />} />
        <Route path="add" element={<WriteMatchingPost />} />
      </Route>

      {/* 중고장터 페이지 */}
      <Route path="market" element={<MarketPageLayout />}>
        <Route path="list" element={<MarketListsContainer />} />
        <Route path="detail/:marketId" element={<MarketPostContainer />} />
        <Route path="add" element={<WriteMarketgPost />} />
      </Route>

      <Route element={<MyPageLayout userInfo={userInfo} />}>
        <Route path="/mypost/" element={<Mypost />} />
        <Route path="/mypet/" element={<MyPetListsContainer />} />
        <Route path="/interestingpost/" element={<InterestedPost />} />
        <Route
          path="/profile/"
          element={<Profile userInfoProps={userInfo} />}
        />
        {/* <Route path="profile/:username" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
