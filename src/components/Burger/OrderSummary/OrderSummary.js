import React, { Component } from "react"
import Aux from "../../hoc/Aux1";
import Button from "../../UI/Button/Button"

class OrderSummary extends Component{
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[OrderSummary.js] componentDidUpdate')
    }

    render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
            .map(igKey=>{
                return <li key={igKey}>
                    <span style={{textTransform:"capitalize"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            })
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
        )
    }

}
export default OrderSummary