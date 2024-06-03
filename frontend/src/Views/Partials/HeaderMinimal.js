import logo from '../../LogoWhite.png';

function HeaderMinimal() {
  return (
    <div className="fixed-to-top-minimal d-flex justify-content-center">
      <img src={logo} alt="logo" height={'300'} />
    </div>
  );
}

export default HeaderMinimal;
