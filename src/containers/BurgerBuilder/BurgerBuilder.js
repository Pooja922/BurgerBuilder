import React, {Component} from "react";
import Aux from "../../components/hoc/Aux1";
import Burger from "../../components/Burger/Burger"
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            meat:1,
            cheese:0
        }

    }
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
            </Aux>
        )

    }
}

export default BurgerBuilder