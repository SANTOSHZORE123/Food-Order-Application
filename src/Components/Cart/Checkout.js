import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

//helpers
const isvalid=value=>value.trim()!==''

const isfivechars=value=>value.trim().length===5;

const Checkout = (props) => {
    const [formInputValidity,setforminputvalidity]=useState({
        name:true,
        street:true,
        postal:true,
        city:true
    })
    //refs
    const enteredNameref=useRef();
    const enteredStreetref=useRef();
    const enteredcityref=useRef()
    const enteredpostalref=useRef()




  const confirmHandler = (event) => {
    event.preventDefault();
    //getting values
    const enteredName=enteredNameref.current.value
    const enteredStreet=enteredStreetref.current.value
    const enteredcity=enteredcityref.current.value
    const enteredpostal=enteredpostalref.current.value
    //checking values
    const isvalidenteredName=isvalid(enteredName)
    const isvalidenteredStreet=isvalid(enteredStreet)
    const isvalidenteredcity=isvalid(enteredcity)
    const isvalidenteredpostal=isfivechars(enteredpostal)

    //setting state value
    setforminputvalidity({
        name:isvalidenteredName,
        street:isvalidenteredStreet,
        postal:isvalidenteredpostal,
        city:isvalidenteredcity
    })

    const formvalid=isvalidenteredName&&isvalidenteredStreet&&isvalidenteredcity&&isvalidenteredpostal

    if(!formvalid){
        return ;
    }

    props.onOrderSubmission({
        name:enteredName,
        street:enteredStreet,
        postalCode:enteredpostal,
        city:enteredcity
    })
    enteredNameref.current.value=''
    enteredStreetref.current.value=''
    enteredcityref.current.value=''
    enteredpostalref.current.value=''
  };

  const namecontrolclasses=`${classes.control} ${formInputValidity.name?'':classes.invalid}`
  const streetcontrolclasses=`${classes.control} ${formInputValidity.street?'':classes.invalid}`
  const citycontrolclasses=`${classes.control} ${formInputValidity.city?'':classes.invalid}`
  const postalcontrolclasses=`${classes.control} ${formInputValidity.postal?'':classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={namecontrolclasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={enteredNameref}/>
        {!formInputValidity.name&&<p>please provide valid Name</p>}
      </div>
      <div className={streetcontrolclasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'ref={enteredStreetref} />
        {!formInputValidity.street&&<p>please provide valid street</p>}
      </div>
      <div className={postalcontrolclasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={enteredpostalref}/>
        {!formInputValidity.postal&&<p>please provide valid postal code(should contain exact 5 chars)</p>}
      </div>
      <div className={citycontrolclasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'ref={enteredcityref} />
        {!formInputValidity.city&&<p>please provide valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;