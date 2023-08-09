import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"
import { useContext, useEffect, useState } from "react"
import { CartObject } from "../../Store/CartContext"
const HeaderCartButton=(props)=>{
    const {cartState}=useContext(CartObject)
    const [addAnimation,setAddAnimation]=useState(false)
    const {cartItems}=cartState
    let uniqueCount=0;
    for(let i=0;i<cartItems.length;i++){
        // console.log(cartItems[i])
        uniqueCount+=+cartItems[i].amount;
    }
    const btnclasses=`${classes.button} ${addAnimation?classes.bump:''}`
    useEffect(()=>{
        if(cartItems.length===0){
            return
        }
        setAddAnimation(true)
        //add remove animation timer
        const timer=setTimeout(()=>{
            // console.log("remove timer called")
            setAddAnimation(false)
        },300)
        return ()=>{
            clearTimeout(timer)
        }
    },[cartItems])


    return <button onClick={()=>props.onOpenModal(true)}className={btnclasses}>
        <span className={classes.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{uniqueCount}</span>
    </button>
}

export default HeaderCartButton