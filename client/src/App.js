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
import WalkingMate from './pages/WalkingMate';
import Chatting from './pages/Chatting';
import UsedTrade from './pages/UsedTrade';
import MatchingPageLayout from './layout/FindingMatesLayout';
import MatchingLists from './pages/findingMates/MatchingLists';
import WriteMatchingPost from './pages/findingMates/MatchingRegisterForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/" element={<Home />} />
      <Route
        path="/post/"
        element={
          <>
            <MiniPostContainer />
          </>
        }
      />
      <Route path="/postpage" element={<PostPage />}>
        <Route path="detailpost" element={<DetailPost />} />
      </Route>
      <Route path="/walkingmate" element={<WalkingMate />} />
      <Route path="/usedtrade" element={<UsedTrade />} />
      <Route path="/chatting" element={<Chatting />} />

      <Route path="match" element={<MatchingPageLayout />}>
        <Route path="list" element={<MatchingLists />} />
        <Route path="add" element={<WriteMatchingPost />} />
      </Route>

      <Route element={<MyPageLayout />}>
        <Route path="/mypost/" element={<Mypost />} />
        <Route path="/profile/" element={<Profile />} />
        {/* <Route path="profile/:username" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
