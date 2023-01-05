import logo from '../assets/logo.png';

const mockData = ['Home', 'Order', 'FAQ'];

function Header() {
  return (
    <header id='app-name-container'>
      <div id='logo-wrapper'>
        <span id='logo'>
          <img src={logo} alt="logo" />
        </span>
      </div>
      <div id='title-wraper'>
        <span className="app-name">Extreme Retro Burgers app</span>
      </div>
      <div id='header-item-wrapper'>
        {mockData.map((link, index) => (
          <span key={`${index}_${link}`} className='header-item'>{link}</span>
        ))}
      </div>
    </header>
  );
}

export default Header;
