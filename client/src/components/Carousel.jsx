
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const CarouselStyle = styled.div`
    .carousel-img-container{
        width: 800px;
        height: 800px;
        margin: 50px auto;
        background-color: rgb(30,30,30);
    }
    .carousel-img-container img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Carousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return(
        <CarouselStyle>
            <div className="carousel-img-container">
            <Slider {...settings}>
                <img src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg" alt="이미지" />
                <img src="https://cdn.mkhealth.co.kr/news/photo/202102/52163_52859_5928.jpg" alt="이미지" /> 
                <img src="https://www.dailysecu.com/news/photo/202104/123449_145665_1147.png" alt="이미지" />
            </Slider>
            </div>
      </CarouselStyle>
    )
}

export default Carousel;