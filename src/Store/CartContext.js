import React, { useReducer } from "react";
export const CartObject=React.createContext()

//reducer function
const CartReducer=(state,action)=>{
    if(action.type==="ADD ITEM"){
        let haselement=false;
        let oldItem;
        let newArray,findindex
        for(let i=0;i<state.cartItems.length;i++){
            if(state.cartItems[i].id===action.payload.items.id){
                haselement=true;
                oldItem=state.cartItems[i];
                findindex=i;
                break;
            }
        }
        if(haselement){
            oldItem={...oldItem,amount:oldItem.amount+action.payload.amount}
            newArray=[...state.cartItems]
            newArray[findindex]=oldItem;
            // console.log(newArray)
        }else{
            oldItem={...action.payload.items,amount:action.payload.amount}
            newArray=state.cartItems.concat(oldItem)
            // console.log(newArray)
        }
        return {...state,cartItems:newArray,totalAmount:state.totalAmount+action.payload.totalAmount}
    }
    if(action.type==="REMOVE ITEM"){
        let existingItemIndex=state.cartItems.findIndex((element)=>element.id===action.payload.id)
        let oldItem=state.cartItems[existingItemIndex]
        let newArray;
        if(oldItem.amount===1){
            newArray=state.cartItems.filter((element)=>element.id!==oldItem.id)
        }else{
            oldItem={...oldItem,amount:oldItem.amount-1}
            state.cartItems[existingItemIndex]=oldItem
            newArray=state.cartItems
        }
        return {
            ...state,cartItems:newArray,totalAmount:state.totalAmount-oldItem.price
        }
    }
    if(action.type==="CLEAR"){
        return {
            cartItems:[],
            totalAmount:0
        }
    }
    return 
}
const CartContext=(props)=>{
    const initial_state={
        cartItems:[],
        totalAmount:0
    }
    const [cartState,dispatchCart]=useReducer(CartReducer,initial_state)
    return <CartObject.Provider value={{cartState,dispatchCart}}>
        {props.children}
    </CartObject.Provider>
}
export default CartContext