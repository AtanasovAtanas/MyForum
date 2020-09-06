import React, { createContext, useReducer } from "react";
import * as DispatchTypes from "./constants";
import AppReducer from "./reducer";
import auth from "../services/auth";

const initialState = {
	user: { userId: "", username: "" },
	isLoggedIn: false,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	function login(user) {
		dispatch({
			type: DispatchTypes.LOGIN,
			payload: user,
		});
	}

	async function getCurrentUser() {
		await auth.getIdentityDetails(
			(response) =>
				dispatch({
					type: DispatchTypes.LOGIN,
					payload: {
						userId: response.userId,
						username: response.username,
					},
				}),
			() => console.log("failed")
		);
	}

	function logout() {
		dispatch({
			type: DispatchTypes.LOGOUT,
			payload: null,
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				isLoggedIn: state.isLoggedIn,
				login,
				logout,
				getCurrentUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
