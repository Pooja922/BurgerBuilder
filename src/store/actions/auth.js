import axios from "axios"

import * as actonTypes from "./actionTypes"

export const authStart=()=>{
    return{
        type:actonTypes.AUTH_START
    }
}

export const authSuccess=(authData)=>{
    return{
        type:actonTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail=(error)=>{
    return{
        type:actonTypes.AUTH_FAIL,
        error:error
    }
}

export const auth=(email,password)=>{
    return dispatch=>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKzfq9WGBjREFndHtvhtN9yFok3jOxgyM',authData)
            .then(response=>{
                dispatch(authSuccess(response.data))
            })

            .catch(err=>{
                console.log(err)
                dispatch(authFail(err))
            })
    }
}
