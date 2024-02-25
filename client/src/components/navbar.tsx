import React from 'react';
// import LogoImage from '../../public/medicheck_logo_lg.png;

interface NavbarProps {
  logo: string; // Define prop type for logo
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  return (
    <div className='w-full h-[120px]'>
      <img src={logo} alt="Medicheck Logo" />
    </div>
  );
};

export default Navbar;