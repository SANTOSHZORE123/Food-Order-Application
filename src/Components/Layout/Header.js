  import classes from "./Header.module.css"
  import mealsimg from "../../assets/meals.jpg"
  import HeaderCartButton from "./HeaderCartButton"
  const Header=(props)=>{
    return (
        <>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onOpenModal={props.onOpenModal}/>
        </header>
            <div className={classes["main-image"]}> 
                <img src={mealsimg} alt="nice meal jpg" />
            </div>
        </>
    )
  }
  export default Header