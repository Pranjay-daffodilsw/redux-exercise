const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'redux action'
    }
};
function buyIceCream(){
    return {
        type: BUY_ICECREAM
    };
};

const initialStateCakes = {
    numOfCakes: 10
};
const initialStateIceCreams = {
    numOfIceCreams: 20
};


const cakeReducer = (state = initialStateCakes, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
};

const iceCreamReducer = (state = initialStateIceCreams, action) => {
    switch(action.type){
        case BUY_ICECREAM: return{
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
};
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})


const store = createStore(rootReducer, applyMiddleware(logger));
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(() => {  });
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();