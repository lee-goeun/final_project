import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const CenterModeCarouselStyle = styled.div`

    width: 1000px;
    height: 500px;
    background-color: wheat;
    margin: 100px auto;

.slick-prev{
        /* left: 50px; */
        z-index: 1;
    }
    .slick-prev::before{
        /* right: 15px; */
        bottom: 15px;
    }
    .slick-next{
        right: 50px;
    }
    .slick-next::before{
        /* right: 15px; */
        bottom: 15px;
    }
    .ddddd{
        width: 300px;
        height: 300px;
        /* background-color: plum; */
        margin: 50px 10px;
    }
    .ddddd img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;


const CarouselTest = () => {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "200px",
        slidesToShow: 1,
        speed: 500
      };

    return(
        <>
        <div>
        <CenterModeCarouselStyle>
        <h2>Center Mode</h2>
        <Slider {...settings}>
        <div className="ddddd">a
            <img src={process.env.PUBLIC_URL + "img/test.jpg"} alt="이미지" />
          </div>
          <div className="ddddd">b
            <img src={process.env.PUBLIC_URL + "img/test.jpg"} alt="이미지" />
          </div>
          <div className="ddddd">c
            <img src={process.env.PUBLIC_URL + "img/test.jpg"} alt="이미지" />
          </div>
          <div className="ddddd">d
            <img src={process.env.PUBLIC_URL + "img/test.jpg"} alt="이미지" />
          </div>

          
        </Slider>
        </CenterModeCarouselStyle>
      </div>

        </>

    )
}

export default CarouselTest;