import React, {useState,useEffect} from "react";
import { connect } from "react-redux"

import Aux from "../../components/hoc/Aux1/Aux1";
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/index"
import axios from "../../axios-orders"


const BurgerBuilder=props=> {
    const [purchasing,setPurchasing]=useState(false)
    useEffect(()=> {
        props.onInitIngredients()
    },[props])

    const updatePurchaseState=(ingredients)=>{                                   //Without Redux
        const sum=Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum,el)=>{
               return sum+el
            },0)
        return sum>0
    }

    /*addIngredientHandler=(type)=>{                                    //Without Redux
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount=oldCount-1
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients)
    }*/

    const purchaseHandler=()=>{
        if(props.isAuthenticated){
            setPurchasing(true)
        }
        else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth')
        }

    }
    const purchaseCancelHandler=()=>{
        setPurchasing(false)
    }
    /*purchaseContinueHandler=()=>{                                           //Without Redux
        //alert('You Continue');
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString=queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString
        })}*/

    const purchaseContinueHandler=()=>{
        props.onInitPurchase()
        props.history.push('/checkout')
        }

        const disabledInfo={
            ...props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null

        let burger= props.error?<p>Ingredients cannot be loaded</p>:<Spinner/>
        if(props.ings){
            burger= (
                <Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={props.price}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}/>
                </Aux>
            )
            orderSummary=<OrderSummary
                purchaseContinued={purchaseContinueHandler}
                purchaseCanceled={purchaseCancelHandler}
                ingredients={props.ings}
                price={props.price}
            />
        }
        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
}

const mapStateToProps=state=>{
   return{
       ings:state.burgerBuilder.ingredients,
       price:state.burgerBuilder.totalPrice,
       error:state.burgerBuilder.error,
       isAuthenticated:state.auth.token!==null
   }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

//export default withErrorHandler(BurgerBuilder,axios)
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))