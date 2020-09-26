import React, { useState } from "react";

import classes from './SideBar.module.css';
import SearchBar from './SearchBar/SearchBar';
import Filters from './Filters/Filter';
import SideBarItem from './SideBarItem/SideBarItem';
import righitIcon from '../../../_assets/caret-right.svg'
import leftIcon from '../../../_assets/caret-left.svg'
const SideBar = ({ locus, filter, isLoaded }) => {
    const [Active, setActive] = useState(true);
    const toggleMenu = () => setActive(!Active);

    return (
        <div className={classes.SideBarContainer}>
            <div
                className={["center-content",  classes.TogglerBtn,
                Active ? classes.TogglerDefault : classes.TogglerActive].join(' ')}
                onClick={() => toggleMenu()}
            >
                <img src={Active ? leftIcon : righitIcon} />
            </div>


            <div className={Active ? classes.ActiveBar : classes.SideBar}>
                <div className={classes.SideBarHeading}>
                    <SearchBar />
                    <Filters filter={filter} />
                </div>
                <div className={classes.SideBarItems}>
                    {
                        isLoaded ?
                            locus.map((loci, index) => <SideBarItem loci={loci} isLoaded={isLoaded} key={index} />) :
                            [...Array(7)].map((_, index) => <SideBarItem isLoaded={isLoaded} key={index}/>)
                    }
                </div>
            </div>


        </div>
    )
}

export default SideBar;