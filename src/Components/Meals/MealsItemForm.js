import classes from "./MealsItemForm.module.css"
import Input from "../UI/Input"
import { useState } from "react"
import { useRef } from "react"
const MealsItemForm=(props)=>{
    const InputRef=useRef();
    const [Invalid,setInvalid]=useState(false)
    const submitHandler=(event)=>{
        event.preventDefault()
        const Amount=InputRef.current.value
        const NumberAmount=+Amount
        if(Amount.trim().length===0||NumberAmount<1||NumberAmount>5){
            setInvalid(true);
        }
        else{
            setInvalid(false)
            console.log(Amount,"you purchased")
            props.getamount(Amount)
        }
    }
    return <form onSubmit={submitHandler} className={classes.form}>
        <Input ref={InputRef} label="Amount" input={{id:"input"+props.id,type:"number",min:'1',max:'5',defaultValue:'1'}}/>
        {Invalid&&(<p style={{color:'red'}}>Enter Amount in (1-5)</p>)}
        <button>+ Add</button>
    </form>
}
export default MealsItemForm