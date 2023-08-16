import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js"; // this means we import every thing from actions as api

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    history.push("/"); // after login the use we are going to homepage or navigate to the home page
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
