import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from 'axios';

// 레이아웃 체크용
// const items = [
//   {
//     id: 1,
//     url: 'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
//   },
//   {
//     id: 2,
//     url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
//   },
//   {
//     id: 3,
//     url: 'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
//   },
//   {
//     id: 4,
//     url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
//   },
//   {
//     id: 5,
//     url: 'https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=',
//   },
// ];

const ImageContainer = styled.div`
  margin: 0 8px;
  width: 150px;
  height: 150px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    width: 1000px;
    margin: 0 auto;
    height: 250px;
  }
  .slick-slide {
    outline: none;
    width: 150px;
    height: 150px;
    margin: 20px 60px 0 60px;
  }
  .slick-list {
    display: flex;
    align-items: center;
  }
  .slick-prev:before,
  .slick-next:before {
    display: block;
    font-size: 20px;
    color: #333;
    opacity: 1;
  }
  .slick-prev:hover:before,
  .slick-next:hover:before {
    color: var(--accent-default);
  }
  .slick-prev {
    left: 10%;
    z-index: 999;
  }
  .slick-next {
    right: 10%;
    z-index: 999;
  }
`;

const Carousel = () => {
  const [timeoutList, setTimeoutList] = useState([]);
  console.log(timeoutList.length);

  const getTimeoutList = async () => {
    let res = await axios.get('http://localhost:3001/match/listLimit1');
    console.log('res', res);
    setTimeoutList(res.data);
  };

  const settings = {
    dots: false,
    infinite: timeoutList.length > 4,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
    arrow: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    getTimeoutList();
  }, []);

  return (
    <StyledSlider {...settings}>
      {timeoutList.map((timeout) => {
        return (
          <ImageContainer key={timeout.matchId}>
            {timeout.id}
            <Image
              src={
                'http://localhost:3001/match/download?matchId=' +
                timeout.matchId +
                '&matchImgName=' +
                timeout.matchImgName
              }
            />
          </ImageContainer>
        );
      })}
      {/*레이아웃 체크용
        {items.map((item) => {
        return (
          <ImageContainer>
            {item.id}
            <Image src={item.url} />
            {'남은시간'}
          </ImageContainer>
        );
      })} */}
    </StyledSlider>
  );
};

export default Carousel;
