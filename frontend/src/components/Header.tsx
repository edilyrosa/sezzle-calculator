import React from 'react';
import '../Header.css';

const Header: React.FC = () => (
  <header
    className=" site-header"
    style={{
      backgroundImage:
        "url('https://yt3.googleusercontent.com/MMA-qaCIJdkK0r-MJwdMHmt4dIm7rkgjVtmRyQeyulXoFeqoq-NosF0_whXsgSlwAy4kMoMYiHg=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj')",
    }}
  >
    <div className="site-header-overlay" />
    <img
      src="https://images.ctfassets.net/6d085vujy22q/273Nz43iRAEjHGwsaCmQDu/dda99ab0df0f1914fa7fcaaba21035fc/image_201.png?w=1000&h=356&q=50&fm=png"
      alt="Sezzle"
      className="site-header-logo"
    />
  </header>
);

export default Header;