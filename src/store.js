import React, {useReducer} from 'react'

const UPDATE_USER = 'UPDATE_USER';
const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_FORMATED_USER = 'UPDATE_FORMATED_USER';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

const initialState = {
    user: null,
    formatedUser: null,
    messages : []
};

export const updateMessage = (payload) => ({
    type: UPDATE_MESSAGE,
    payload
});

export const addMessage = (payload) => ({
    type: ADD_MESSAGE,
    payload
});

export const updateUser = (payload) => ({
    type: UPDATE_USER,
    payload
});

export const updateFormatedUser = (payload) => ({
    type: UPDATE_FORMATED_USER,
    payload
});

const reducer = (state, action) => {

    console.log('action.type',action.type,state)

    switch (action.type) {
        case UPDATE_MESSAGE :

            const copy = [...state.messages];
            copy[action.payload].like = !state.messages[action.payload].like;

            return {
                ...state,
                messages:copy
            };
        case ADD_MESSAGE :
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case UPDATE_USER :
            return {
                ...state,
                user: action.payload
            };
        case UPDATE_FORMATED_USER :
            return {
                ...state,
                formatedUser: action.payload
            };
        default:
            return state;
    }
};

const Store = React.createContext();


const middleware = store => next => action => {

    switch (action.type) {
        case ADD_MESSAGE :

            const emojis = [
                {pattern : /\(lion\)/gi, replacement : '&#129409;'},
                {pattern : /\(coffee\)/gi, replacement : '&#9749;'}
            ];

            let m = action.payload.value;

            emojis.forEach(emoji => {
                m = m.replace(emoji.pattern ,emoji.replacement);
            });

            action.payload.formatedValue = m;

            break;
        case UPDATE_USER :
            store.dispatch(updateFormatedUser('[' + action.payload.split('').join('|') + ']'));
            break;
    }

    next(action);

    // action after state update
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
