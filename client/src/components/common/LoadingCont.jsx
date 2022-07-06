import React from 'react';
import styled from 'styled-components';

const LoadingContStyle = styled.div`
  .in {
    padding: 40px;
    width: fit-content;
    height: fit-content;
    background-color: white;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 20%);

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 10px;
  }
  .img-cont {
    width: 150px;
    height: 150px;
    background-color: white;
    margin: 0 auto;
  }
  .img-cont img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    margin-top: 20px;
    font-size: 20px;
    color: var(--font-dark);
  }
`;

const LoadingCont = () => {
  return (
    <LoadingContStyle>
      <div className="in">
        <div className="img-cont">
          <img src={process.env.PUBLIC_URL + '/img/LogoVertical.png' } alt='logo' />
        </div>
        <p>Loading ...</p>
      </div>
    </LoadingContStyle>
  );
};

export default LoadingCont;
