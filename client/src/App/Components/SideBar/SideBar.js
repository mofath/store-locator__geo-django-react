import React, { useState } from "react";

import classes from './SideBar.module.css';
import SearchBar from './SearchBar/SearchBar';
import Filters from './Filters/Filter';
import SideBarItem from './SideBarItem/SideBarItem';

const SideBar = ({ locus, filter }) => {
    const [Active, setActive] = useState(true);
    const toggleMenu = () => setActive(!Active);

    return (
        <div className={classes.SideBarContainer}>
            <div
                className={Active ? classes.TogglerBtn : classes.TogglerActive}
                onClick={() => toggleMenu()}
            >
                heell
            </div>
            
              
            <div className={Active ? classes.ActiveBar : classes.SideBar}>
                <div className={classes.SideBarHeading}>
                    <SearchBar />
                    <Filters filter={filter} />
                </div>
                <div className={classes.SideBarItems}>
                    {
                        locus.map((loci) => <SideBarItem loci={loci} />)
                    }
                </div>
            </div>


        </div>
    )
}

export default SideBar;