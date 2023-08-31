import React from 'react';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';

const HomeIcons = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Link to="/shopping/wishlist">
                <StarIcon style={{ width: '60px', height: '60px', margin: '0 10px 0 10px'}} />
            </Link>
            <Link to="/shopping/cart">
                <ShoppingCartIcon style={{ width: '60px', height: '60px', margin: '0 10px 0 10px' }} />
            </Link>
        </div>
      
    );
};

export default HomeIcons;