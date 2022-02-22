import styled from 'styled-components';

const FooterStyle = styled.div`
  margin: 50px auto 0 auto;
  height: 100px;
  width: 100%;
  color: var(--font-dark);
  border-top: 1px solid var(--bordercolor-default);
  /* background-color: #e6e6e6; */
  text-align: center;

  p {
    padding-top: 40px;
  }
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
