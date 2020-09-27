import React from 'react';

import PropTypes from 'prop-types';

import classes from './SideBarItem.module.css';
import { Skeleton } from '../../LoadingSkeleton/LoadingSkeleton';

const SideBarItem = ({ loci, showLoader }) => {

    if (showLoader)
        return (
            <div className={classes.SideBarItem}>
                <div className="horizontal-layout">
                    <h4 className={classes.Title}><strong><Skeleton /></strong></h4>
                </div>
                <h5 className={classes.Address}><Skeleton /></h5>
                <h5 className={classes.Distance}><Skeleton /></h5>
            </div>
        )

    return (
        <div className={[classes.SideBarItem, classes.Hover].join(' ')}>
            <div className={[classes.Heading, "horizontal-layout"].join(' ')}>
                <h4 className={classes.Title}><strong>{loci.name}</strong></h4>
                <h5><em>{loci.category}</em></h5>
            </div>
            <h5 className={classes.Address}>{loci.address}</h5>
            <h5 className={classes.Distance}><b>{loci.distance}</b>&nbsp;km away</h5>
        </div>
    )
}

SideBarItem.propTypes = {
    loci: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        distance: PropTypes.string.isRequired,
    }),
    showLoader: PropTypes.bool.isRequired
}

export default SideBarItem;
