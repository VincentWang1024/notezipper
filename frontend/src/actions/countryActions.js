import {
    COUNTRY_LIST_FAIL,
    COUNTRY_LIST_REQUEST,
    COUNTRY_LIST_SUCCESS,
  } from "../constants/countryConstants";
  import axios from "axios";
  
  export const listCountries = (name) => async (dispatch, getState) => {
    console.log("search: ", name);
    try {
      dispatch({
        type: COUNTRY_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`, config);
      
      console.log(data);
      dispatch({
        type: COUNTRY_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: COUNTRY_LIST_FAIL,
        payload: message,
      });
    }
  };