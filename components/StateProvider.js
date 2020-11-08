// FILE: The setup of the data layer.
import React, { createContext, useContext, useReducer } from 'react'

// This is the actual data layer.
export const StateContext = createContext()

// This is the provider in which the entire app will be wrapped.
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)