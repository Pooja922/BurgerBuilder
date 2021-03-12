import React from "react";
import Aux from "../hoc/Aux1";
import classes from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

const layout=(props)=>(
        <Aux>
            <div>
                <Toolbar/>
                <SideDrawer/>
            <main className={classes.Content}>
                {props.children}
            </main>
            </div>
        </Aux>
)

export default layout