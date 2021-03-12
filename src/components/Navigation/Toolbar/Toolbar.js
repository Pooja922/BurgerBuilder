import React from "react"
import classes from './Toolbar.module.css'
import Logo from "../../Logo/Logo"

const toolbar=()=>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div><Logo/></div>
        <nav>...
        </nav>

    </header>
)


export default toolbar