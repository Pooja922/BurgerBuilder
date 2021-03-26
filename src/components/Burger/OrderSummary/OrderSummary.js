import React from "react"
import Aux from "../../hoc/Aux1/Aux1";
import Button from "../../UI/Button/Button"

const OrderSummary =props=>{
        const ingredientSummary=Object.keys(props.ingredients)
            .map(igKey=>{
                return <li key={igKey}>
                    <span style={{textTransform:"capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}</li>
            })
            return(<Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
                <Button clicked={props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
            )

}
export default OrderSummary