const initialState = {
          count : 0
      }

const CounterReducer = (state = initialState, action) => {

switch(action.type)
{
          case 'INCREMENT' : 
          return {...state, count : state.count + 1};     
          case 'DECREMENT' : 
          return {...state, count : state.count - 1}; 
          case 'POWER' : 
          return {...state, count : Math.pow(state.count,2)};
          default:
                    return state;
}

 }

 export const increment = () => ({type : 'INCREMENT'})
export const decrement = () => ({ type: 'DECREMENT' });
export const power = () => ({type : 'POWER'})
 export default CounterReducer;

