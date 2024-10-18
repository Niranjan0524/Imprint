import {createSlice} from '@reduxjs/toolkit';

const deckNameSlice = createSlice({
          name:"deckNames",
          initialState:[],
          reducers:{
              addDeckName(state,action){
                  console.log("Deck Name:", action.payload);
                  state.push(action.payload);
                  console.log("No of values in DeckName Store:", state.length);
              },
              removeDeckName(state,action){
                  state = state.filter(deckName => deckName !== action.payload);
                  
              }
          }
});


export const deckNameActions = deckNameSlice.actions;

export default deckNameSlice; 
