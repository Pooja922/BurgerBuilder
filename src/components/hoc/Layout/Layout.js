import React,{useState} from "react";
import {  connect } from "react-redux"

import Aux from "../Aux1/Aux1";
import classes from './Layout.module.css';
import Toolbar from "../../Navigation/Toolbar/Toolbar"
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer"

const Layout =props=>{
    const [sideDrawerIsVisible,setDrawerIsVisible]=useState(false)
    const sideDrawerClosedHandler=()=>{
        setDrawerIsVisible(false)
    }
    const sideDrawerToggleHandler=()=>{
        setDrawerIsVisible(!sideDrawerIsVisible)
    }
        return(
            <Aux>
                    <Toolbar
                        isAuth={props.isAuthenticated}
                        drawerToggleClicked={sideDrawerToggleHandler}/>
                    <SideDrawer
                        isAuth={props.isAuthenticated}
                        open={sideDrawerIsVisible}
                        closed={sideDrawerClosedHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Aux>
        )
    }

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(Layout)