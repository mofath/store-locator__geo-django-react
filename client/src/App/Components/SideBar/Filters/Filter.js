import React from 'react';

import classes from './Filters.module.css';
import hotelImg from '../../../../_assets/hotel.png';
import groceryImg from '../../../../_assets/grocery.png';
import restaurantImg from '../../../../_assets/restaurant.png';
import clearFilterImg from '../../../../_assets/clear-filter.png';


const Filters = ({ filter }) => {
    return (
        <div className={[classes.FiltersContainer, 'horizontal-layout'].join(' ')}>
            <div className={classes.Filter}>
                <button
                    className={[classes.Grocery, , "center-content"].join(' ')}
                    onClick={() => filter("grocery")}
                >
                    <img src={groceryImg} alt="" />
                </button>
            </div>
            <div className={classes.Filter}>
                <button
                    className={[classes.Restaurant, "center-content"].join(' ')}
                    onClick={() => filter("restaurant")}
                >
                    <img src={restaurantImg} alt="" />
                </button>
            </div>
            <div className={classes.Filter}>
                <button
                    className={[classes.Hotel, "center-content"].join(' ')}
                    onClick={() => filter("hotel")}
                >
                    <img src={hotelImg} alt="" />
                </button>
            </div>
            <div className={classes.Filter}>
                <button
                    className={[classes.All, "center-content"].join(' ')}
                    onClick={() => filter("all")}
                >
                    <img src={clearFilterImg} alt="" />
                </button>
            </div>
        </div>
    )

}

export default Filters;