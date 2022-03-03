import React, { useState } from 'react';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import axios from 'axios';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

// 레이아웃체크용
// const [timeoutMatchingList, setTimeoutMatchingList] = useState([
//   'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
//   'https://media.istockphoto.com/photos/young-female-holding-cute-little-pembroke-welsh-corgi-puppy-taking-picture-id1317237255?k=20&m=1317237255&s=612x612&w=0&h=Gs4TZ5Sta3jyf_AB8Fdg0nV7elYdJowS3S8AxGVq234=',
//   'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
//   'https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
//   'https://media.istockphoto.com/photos/funny-friends-cute-cat-and-corgi-dog-are-lying-on-a-white-bed-picture-id1347494018?k=20&m=1347494018&s=612x612&w=0&h=ztjdI3c9A9DUAxZ7b_qgkPF7HN6FxKifCrUuQF7zz3M=',
// ]);
// const [matchingList, setMatchingList] = useState([
//   'https://media.istockphoto.com/photos/funny-friends-cute-cat-and-corgi-dog-are-lying-on-a-white-bed-picture-id1347494018?k=20&m=1347494018&s=612x612&w=0&h=ztjdI3c9A9DUAxZ7b_qgkPF7HN6FxKifCrUuQF7zz3M=',
//   'https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=',
//   'https://media.istockphoto.com/photos/pretty-chihuahua-puppy-dog-wearing-red-warm-sweater-in-scandinavian-picture-id1179029286?k=20&m=1179029286&s=612x612&w=0&h=-67AzuS9PC2OeN4oTFoqYP2BvSQtebhR65BRBXgj9DM=',
//   'https://media.istockphoto.com/photos/young-female-holding-cute-little-pembroke-welsh-corgi-puppy-taking-picture-id1317237255?k=20&m=1317237255&s=612x612&w=0&h=Gs4TZ5Sta3jyf_AB8Fdg0nV7elYdJowS3S8AxGVq234=',
//   'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
// ]);

// <img src="https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=" />
// </div>
// <div>
//   <img src="https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=" />
// </div>
// <div>
//   <img src="https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=" />
// </div>
// <div>
//   <img src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" />
// </div>
// <div>
//   <img src="https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=" />
// </div>
// <div>
//   <img src="https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=" />

const items = [
  {
    id: 1,
    url: 'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 3,
    url: 'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 5,
    url: 'https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=',
  },
  {
    id: 6,
    url: 'https://media.istockphoto.com/photos/young-female-holding-cute-little-pembroke-welsh-corgi-puppy-taking-picture-id1317237255?k=20&m=1317237255&s=612x612&w=0&h=Gs4TZ5Sta3jyf_AB8Fdg0nV7elYdJowS3S8AxGVq234=',
  },
  {
    id: 7,
    url: 'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  },
  {
    id: 8,
    url: 'https://media.istockphoto.com/photos/chihuahua-dog-sleep-on-bed-picture-id958839274?k=20&m=958839274&s=612x612&w=0&h=9ZlWCfYGdVSf7PhaqyeqC79vznWXSDb9LJAWv7rxHQU=',
  },
  {
    id: 9,
    url: 'https://media.istockphoto.com/photos/dog-napping-with-baby-picture-id1287317675?k=20&m=1287317675&s=612x612&w=0&h=8JrDNntBc5iYZ_RY9dOfvoVNaGVozW1sRMt-ZoTQh7U=',
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
  },
];

const Container = styled.div`
  overflow: hidden;
`;

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
  .slick-arrow .slick-next ::before {
    right: 30px;
  }
  .slick-track {
    height: 200px;
  }
`;

const ImageContainer = styled.div`
  margin: 0 8px;
  width: 150px;
  height: 150px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

// const Wrap = styled.div`
//   margin: 5% auto;
//   width: 100%;
//   .slick-prev:before {
//     opacity: 1; // 기존에 숨어있던 화살표 버튼이 보이게
//     color: black; // 버튼 색은 검은색으로
//     left: 0;
//   }
//   .slick-next:before {
//     opacity: 1;
//     color: black;
//   }
// `;

const Carousel = () => {
  const [timeoutList, setTimeoutList] = useState([]);
  console.log(timeoutList);
  React.useEffect(() => {
    getTimeoutList();
  }, []);

  const getTimeoutList = async () => {
    let res = await axios.get('http://localhost:3001/match/listLimit1');
    console.log('res', res);
    setTimeoutList(res.data);
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    variableWidth: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <StyledSlider {...settings}>
      {/* {timeoutList.map(
        (timeout) => {
          console.log(timeout);
          return (
            <ImageContainer>
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
        },
        // <Post key={timeout.matchId} post={timeout}></Post>
      )} */}
      {items.map((item) => {
        return (
          <ImageContainer>
            {item.id}
            <Image src={item.url} />
            {'남은시간'}
          </ImageContainer>
        );
      })}
    </StyledSlider>
  );
};

export default Carousel;
