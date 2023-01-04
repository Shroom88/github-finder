import { createContext, useReducer } from "react";
import { useState } from "react";
import githubReducer from "./GithubReducer";

const apiUrl = process.env.REACT_APP_GITHUB_URL;
const token = process.env.TOKEN;

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get Initial Users (testing)
  //   const fetchUsers = async () => {
  //     setLoading();
  //     const response = await fetch(`${apiUrl}/users`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     const data = await response.json();

  //     dispatch({
  //       type: "GET_USERS",
  //       payload: data,
  //     });
  //   };

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${apiUrl}/search/users?${params}`, {
      headers: {
        Authorization: token,
      },
    });

    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  //Set Loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
