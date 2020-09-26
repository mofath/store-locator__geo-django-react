import React from 'react';

import classes from './PreLoader.module.css';


const PreLoader = () =>
    <div className={classes.PreLoaderContainer}>
        <div className={classes.MapLoader}>Map loading...</div>
        <div className={classes.Bar}>
            <div className={classes.ProgressBar}></div>
        </div>
    </div>

export default PreLoader;