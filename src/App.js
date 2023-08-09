import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartContext from "./Store/CartContext";
function App() {
  const [OpenModal,setOpenModal]=useState(false)
  const [OrderModal,setOrderModal]=useState(false)
  return (
    <CartContext>
      <Cart onOrder={setOrderModal} onOpenModal={setOpenModal} state={{OpenModal:OpenModal,OrderModal:OrderModal}}/>
      <Header onOpenModal={setOpenModal}/>
      <Meals/>
    </CartContext>
  );
}

export default App;
