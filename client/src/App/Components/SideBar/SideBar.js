import React, { useEffect, useState, useRef } from "react";

import PropTypes from 'prop-types';

import classes from './SideBar.module.css';
import SearchBar from './SearchBar/SearchBar';
import Filters from './Filters/Filter';
import SideBarItem from './SideBarItem/SideBarItem';
import righitIcon from '../../../_assets/caret-right.svg';
import leftIcon from '../../../_assets/caret-left.svg';

const SideBar = ({ locus, filter, isLoaded }) => {
    const [Active, setActive] = useState(true);
    const [ShowLoader, setShowLoader] = useState(true);

    const toggleMenu = () => setActive(!Active);


    // this is a workaround to display
    // loading skeleton for 1's whenever a filter is applied
    const timeoutRef = useRef();
    useEffect(() => {
        if (isLoaded) {
            timeoutRef.current = setTimeout(() => setShowLoader(false), 1000);
            return () => {
                setShowLoader(true)
                clearTimeout(timeoutRef.current);
            }
        }
    }, [isLoaded, locus]);

    return (
        <div className={classes.SideBarContainer}>
            <div
                className={["center-content", classes.TogglerBtn,
                    Active ? classes.TogglerDefault : classes.TogglerActive].join(' ')}
                onClick={() => toggleMenu()}
            >
                <img src={Active ? leftIcon : righitIcon} alt="" />
            </div>


            <div className={Active ? classes.ActiveBar : classes.SideBar}>
                <div className={classes.SideBarHeading}>
                    <SearchBar />
                    <Filters filter={filter} />
                </div>
                <div className={classes.SideBarItems}>
                    {
                        ShowLoader ?
                            [...Array(7)].map((_, index) => <SideBarItem showLoader={ShowLoader} key={index} />)
                            :
                            locus.map((loci, index) => <SideBarItem loci={loci} showLoader={ShowLoader} key={index} />)
                    }
                </div>
            </div>
        </div>
    )
}

SideBar.propTypes = {
    isLoaded : PropTypes.bool.isRequired,
    locus : PropTypes.array,
    filter : PropTypes.func
}

export default React.memo(
    SideBar,
    (prevProps, nextProps) =>
        nextProps.isLoaded === prevProps.isLoaded &&
        nextProps.locus === prevProps.locus &&
        nextProps.filter === prevProps.filter
);


