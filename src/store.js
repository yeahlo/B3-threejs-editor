import React, {useReducer} from 'react'

const UPDATE_COLOR = 'UPDATE_COLOR';
const UPDATE_SHAPE = 'UPDATE_SHAPE';
const UPDATE_GADGET = 'UPDATE_GADGET';
const UPDATE_TEXTURE = 'UPDATE_TEXTURE';

const initialState = {
    color: {r : 255, g : 0, b : 0},
    shape: null,
    gadget: null,
    texture : '01'
};

export const updateTexture = (payload) => ({
    type: UPDATE_TEXTURE,
    payload
});

export const updateShape = (payload) => ({
    type: UPDATE_SHAPE,
    payload
});

export const updateGadget = (payload) => ({
    type: UPDATE_GADGET,
    payload
});

export const updateColor = (payload) => ({
    type: UPDATE_COLOR,
    payload
});

const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_COLOR :
            return {
                ...state,
                color:action.payload
            };
        case UPDATE_SHAPE :
            return {
                ...state,
                color:action.payload
            };
        case UPDATE_TEXTURE :
            return {
                ...state,
                texture:action.payload
            };
        case UPDATE_GADGET :
            return {
                ...state,
                gadget:action.payload
            };
        default:
            return state;
    }
};

const Store = React.createContext();


const middleware = store => next => action => {
    next(action);
};

const compose = (...funcs) => x => funcs.reduceRight((composed, f) => f(composed), x);

const StoreProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const middlewareAPI = {
        getState: () => state,
        dispatch: action => dispatch(action)
    };

    const middlewares = [middleware];

    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    const enhancedDispatch = compose(...chain)(dispatch);

    const value = {state, dispatch: enhancedDispatch};

    return <Store.Provider value={value}>{props.children}</Store.Provider>;
};

export {Store, StoreProvider};
