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
        dispatch(authStart())
    }
}
