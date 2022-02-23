import Header from "../components/Header";
import { PostBackground, MatePostContainer } from "../components/Post";
import Footer from "../components/Footer";

const WalkingMate = () => {

    return(
        <>
        <Header />
        <PostBackground />
        <h1>산책메이트찾기</h1>
        <MatePostContainer />
        <Footer />
        </>
    );
}

export default WalkingMate;