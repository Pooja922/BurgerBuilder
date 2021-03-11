import React, {Component} from "react";
import Aux from "../../components/hoc/Aux1";
import Burger from "../../components/Burger/Burger"
class BurgerBuilder extends Component{
    render(){
        return(
            <Aux>
                <Burger/>
            </Aux>
        )

    }
}

export default BurgerBuilder