import React, {Component} from "react";
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


class BurgerBuilder extends Component{
    state={
        purchasing:false,
    }
    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState(ingredients){                                   //Without Redux
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

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth')
        }

    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
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

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
        }

    render(){
        const disabledInfo={
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null

        let burger= this.props.error?<p>Ingredients cannot be loaded</p>:<Spinner/>
        if(this.props.ings){
            burger= (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            )
            orderSummary=<OrderSummary
                purchaseContinued={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler}
                ingredients={this.props.ings}
                price={this.props.price}
            />
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )

    }
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