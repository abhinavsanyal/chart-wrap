import React, { Component } from 'react';
import classes from "./Dashboard.module.css";
import LineGraph from "../../components/Line/LineGraph";


export default class Dashboard extends Component {

    render() {
    
        return (
            <div className={classes.container}>
              
                <LineGraph
                     />

            </div>
        )
    }
}
