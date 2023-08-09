import classes from "./AvailableMeals.module.css"
import Card from "../UI/Card";
import MealsItem from "./MealsItem";
import { useEffect, useState } from "react";

  const AvailableMeals=()=>{
    const [MealsItemArray,SetMealArray]=useState([])
    const [Error,SetError]=useState()
    const [isLoading,setisloading]=useState(true)
    const fetchMeals=async()=>{
      const response=await fetch("https://react-http-f9748-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json")
      if(!response.ok){
        throw new Error("Something went wrong")
      }
      const data =await response.json()
      const loadedMeals=[]
      for(let key in data){
        loadedMeals.push({
          id:key,
          name:data[key].name,
          description:data[key].description,
          price:data[key].price,
          amount:data[key].amount
        })
      }
      // console.log(loadedMeals)
      SetMealArray(loadedMeals)
      setisloading(false);
    }
    useEffect(()=>{
      fetchMeals().catch(error=>{
        SetError(error.message)
        console.log(error)
        setisloading(false)
      })
    },[])
    
    if(isLoading){
      return <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    }

    if(Error){
      return <section className={classes.MealsLoading}>
      <p>{Error}</p>
    </section>
    }
    const MealsArray=MealsItemArray.map((meals)=>{
      // console.log(meals)
        return <MealsItem key={meals.id} item={meals}/>
        })
    return <section className={classes.meals}>
            <Card>
                <ul>{MealsArray}</ul>
            </Card>
    </section>
  }

  export default AvailableMeals