import React from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

const Header = () => (
    <div className="topnav">
        <Link to={`/products`}>STORE</Link>
        <Link to={`/products`}>Home</Link>
        <Link to={`/products/new`}>New product</Link>
    </div>
);

export default Header;