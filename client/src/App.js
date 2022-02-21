import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyPageLayout from './MyPageLayout';
import Profile from './pages/Profile';
import Mypost from './pages/MyPost';
import Login from './components/authentication/Login';
import Join from './components/authentication/Join';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/" element={<Home />} />
      <Route element={<MyPageLayout />}>
        <Route path="/mypost/" element={<Mypost />} />
        <Route path="/profile/" element={<Profile />} />
        {/* <Route path="profile/:username" element={<Profile />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
