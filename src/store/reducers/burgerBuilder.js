import * as actionTypes from '../actions/actionTypes'                //import all constants from actionTypes.js file

const initialState={
    ingredients:{
        salad:0,
        meat:0,
        bacon:0,
        cheese:0
    },
    totalPrice: 4
}

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:1.5
}

const burgerBuilder=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:{
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,             //copy the original ingredients using spread operator
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice: state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            }
        }
        case actionTypes.REMOVE_INGREDIENT:{
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice: state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
            }
        }
        default:
            return state
    }


}

export default burgerBuilder