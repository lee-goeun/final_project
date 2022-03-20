import styled from 'styled-components';

const FooterStyle = styled.div`
  margin: 0 auto;
  height: fit-content;
  width: 100%;
  color: white;
  background-color: rgb(50, 50, 50);
  text-align: center;
  padding: 50px 0;
  h3 {
    margin-bottom: 20px;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer">
        <h3>ⓒ PET＆PET ALL RIGHTS RESERVED</h3>
        <p>반려인들을 위한 온라인 커뮤니티</p>
      </div>
    </FooterStyle>
  );
};

export default Footer;
