import React from 'react';
import classes from './SideBarItem.module.css';
import { Skeleton } from '../../LoadingSkeleton/LoadingSkeleton';

const SideBarItem = ({ loci, isLoaded }) => {
    if (!isLoaded)
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
        <div className={classes.SideBarItem}>
            <div className={[classes.Heading, "horizontal-layout"].join(' ')}>
                <h4 className={classes.Title}><strong>{loci.name}</strong></h4>
                <h5><em>{loci.category}</em></h5>
            </div>
            <h5 className={classes.Address}>{loci.address}</h5>
            <h5 className={classes.Distance}>{loci.distance}&nbsp;km away</h5>
        </div>
    )
}

export default SideBarItem;
