const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');


const initialState = {
    loading: false,
    users: [],
    error: ''
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    };
};
const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    };
};
const fetchUsersFaliure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    };
};

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                users: action.payload
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    };
};

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(
            (response) => {
                dispatch(fetchUsersSuccess(response.data))
            }
        )
        .catch(
            (error) => {
                dispatch(fetchUsersFaliure(error.message));
            }
        )
    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(
    () => {console.log(store.getState())}
);
store.dispatch(fetchUsers())