import React from 'react';

import serarchIcon from '../../../../_assets/search-icon.svg';
import classes from './SearchBar.module.css'

const SearchBar = () => {
    

    return (
        <div className={[classes.SearchBar, 'horizontal-layout'].join(' ')}>
            <input type="search"  />
            <button><img src={serarchIcon} alt="" /></button>
        </div>
     )
}

export default SearchBar;