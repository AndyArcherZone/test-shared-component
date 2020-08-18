import React, { useState } from 'react';

const Header = ({ title }) => {
  const [count, setCount] = useState(0);

  return (
    <header className="custom-header-module">
      <h2>{title}</h2>
      <button type='button' onClick={() => setCount(prevState => prevState += 1)}>
        Increment
      </button>
      {count}
    </header>
  )
}

export default Header;
