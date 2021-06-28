import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants";
import axios from 'axios';

export const login = (email,password) => async (dispatch) =>{
    try {

        dispatch({
            type:USER_LOGIN_REQUEST
        });
            // To make api request that takes json data
            // we need to provide some header 
        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }

        const {data} = await axios.post(
            '/api/users/login',
            {
                email,
                password,
            },
            config
        );

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        });

        // localstorage can't store the object data
        // so we need to convert it into string data
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
            ?error.response.data.message:error.message
        })
    }
};

export const logout = () => async (dispatch) =>{
    localStorage.removeItem("userInfo");
    dispatch({
        type:USER_LOGOUT
    });
}