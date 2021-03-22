import axios from "axios"

import * as actonTypes from "./actionTypes"

export const authStart=()=>{
    return{
        type:actonTypes.AUTH_START
    }
}

export const authSuccess=(token,userId)=>{
    return{
        type:actonTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actonTypes.AUTH_FAIL,
        error:error
    }
}

export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKzfq9WGBjREFndHtvhtN9yFok3jOxgyM'
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKzfq9WGBjREFndHtvhtN9yFok3jOxgyM'
        }
        axios.post(url,authData)
            .then(response=>{
                console.log(response)
                dispatch(authSuccess(response.data.idToken,response.data.userId))
            })

            .catch(err=>{
                dispatch(authFail(err.response.data.error))
            })
    }
}
