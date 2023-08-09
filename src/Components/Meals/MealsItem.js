import classes from "./MealsItem.module.css"
import MealsItemForm from "./MealsItemForm"
import { useContext } from "react"
import { CartObject } from "../../Store/CartContext"
const MealsItem = (props) => {
    const {dispatchCart}=useContext(CartObject)
    // console.log(Amount,"hii")
    let totalAmount=0;
    const onAddHandler=(value)=>{
        console.log(value,"value received")
        for(let i=0;i<value;i++){
            // console.log(i)
            totalAmount+=props.item.price
        }
        dispatchCart({type:"ADD ITEM",payload:{items:props.item,totalAmount:totalAmount,amount:+value}})
        // console.log(props.item,"hii")
    }
    return <li className={classes.meal}>
        <div>
            <h3>{props.item.name}</h3>
            <div className={classes.description}>
                {props.item.description}
            </div>
            <div className={classes.price}>
                {`$${props.item.price.toFixed(2)}`}
            </div>
        </div>
        <div>
            <MealsItemForm id={props.item.id} getamount={onAddHandler}/>
        </div>
    </li>
}
export default MealsItem