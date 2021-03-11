import React, {Component} from "react";
import Aux from "../../components/hoc/Aux1";
import Burger from "../../components/Burger/Burger"
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:1,
            bacon:1,
            meat:2,
            cheese:2
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