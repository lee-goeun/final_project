import styled from 'styled-components';

const FooterStyle = styled.div`
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
  background-color: #e6e6e6;
  text-align: center;
  line-height: 100px;
`;

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer">
        <p>ⓒ PET＆PET ALL RIGHTS RESERVED</p>
      </div>
    </FooterStyle>
  );
};

export default Footer;
