import {
  COUNTRY_LIST_FAIL,
  COUNTRY_LIST_REQUEST,
  COUNTRY_LIST_SUCCESS,
} from "../constants/countryConstants";

export const countryListReducer = (state = { countries: [] }, action) => {
  switch (action.type) {
    case COUNTRY_LIST_REQUEST:
      return { loading: true, countries: [] };
    case COUNTRY_LIST_SUCCESS:
      return { loading: false, countries: action.payload };
    case COUNTRY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};