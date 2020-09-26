import React from 'react';
import classes from './SideBarItem.module.css';
import styled from 'styled-components';

const SideBarItem = ({ loci }) =>
    <div className={classes.SideBarItem}>
        <div className={[classes.Heading, "horizontal-layout"].join(' ')}>
            <h4><strong>{loci.name}</strong></h4>
            <h5><em>{loci.category}</em></h5>
        </div>
        <h5 style={{marginBottom:"5px"}}>{loci.address}</h5>
        <h5>{loci.distance}&nbsp;km away</h5>
    </div>

export default SideBarItem;