import { GET_CAPITAL, GET_SUBREGION } from './actions';

const reducer = (state, action) => {
    if (action.type === GET_CAPITAL) {
      console.log(action.payload.capital)
      return { ...state, capital: action.payload.capital } 
    }

    if (action.type === GET_SUBREGION) {
      return { ...state, subregion: action.payload.subregion }
    }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default reducer;
