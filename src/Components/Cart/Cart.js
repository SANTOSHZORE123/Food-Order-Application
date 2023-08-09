import classes from "./Cart.module.css"
import Modal from "../UI/Modal"
import { useContext, useState } from "react"
import {CartObject} from "../../Store/CartContext"
import CartItem from "./CartItem"
import Checkout from "./Checkout"
const Cart=(props)=>{
    const [submitting,setSubmitting]=useState(false)
    const [submitted,setsubmitted]=useState(false);
    const [isCheckOut,setischeckout]=useState(false)
    const {cartState,dispatchCart}=useContext(CartObject)
    const removeHandler=(id)=>{
        dispatchCart({type:"REMOVE ITEM",payload:{id:id}})
    }
    const AddHandler=(item)=>{
        // console.log(item)
        dispatchCart({type:"ADD ITEM",payload:{items:item,totalAmount:item.price,amount:+1}})
    }
    const totalAmount=`$${cartState.totalAmount.toFixed(2)}`
    // console.log(cartState.cartItems.length)
    const hasItems=cartState.cartItems.length>0
    // console.log(cartState.cartItems)
    const cartItems=<ul className={classes['cart-items']}>{cartState.cartItems.map((meals,index)=>{
        return <CartItem key={meals.id+index} name={meals.name} amount={meals.amount} price={meals.price} onRemove={removeHandler.bind(null,meals.id)}onAdd={AddHandler.bind(null,meals)}/>
    })}</ul>
    const closeModalHandler=()=>{
        setischeckout(false)
        setsubmitted(false)
        props.onOpenModal(false);
    }
    const OrderModalHandler=()=>{
        setischeckout(true)
    }
    const modalactions=<div className={classes.actions}>
        <button onClick={closeModalHandler} className={classes['button--alt']}>Close</button>
        {hasItems&&<button onClick={OrderModalHandler} className={classes.button}>Order</button>}
    </div>

    //submitting user order to server
    // const resetAllvariables=()=>{
    //     setischeckout(false);
    //     setSubmitting(false);
    // }
    const submitOrder=async(order)=>{
        setSubmitting(true)
        await fetch("https://react-http-f9748-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",{
            method:'POST',
            body:JSON.stringify({
                username:order,
                orderedItems:cartState.cartItems
            })
        })
        setSubmitting(false)
        setsubmitted(true)
        dispatchCart({type:"CLEAR"})
        // resetAllvariables()
    }

    const ModalContent=<>{cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckOut&& <Checkout onOrderSubmission={submitOrder}onClose={closeModalHandler}/>}  
            {!isCheckOut&&modalactions}
        </>
    const submittingContent=<p>Processing and Submitting Your Order...</p>

    const submittedcontent=<>
        <p>Your Order Has Been Placed Successfully.</p>
        <div className={classes.actions}>

         <button onClick={closeModalHandler} className={classes.button}>Close</button>
        </div>
    </>
    return <>
     {(props.state.OpenModal&&<Modal onClose={closeModalHandler}>
        {!submitting&&!submitted&&ModalContent}
        {submitting&&submittingContent}
        {!submitting&&submitted&&submittedcontent}
    </Modal>)}
    </>
}

export default Cart