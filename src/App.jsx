
import {useState,useEffect} from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {
  //state

  const InitialCart=()=>{
    const localStorageCart= localStorage.getItem("cart")
    return localStorageCart? [...JSON.parse(localStorageCart)]:[]

  }
  const [data]=useState(db)
  const [cart,setCart]=useState(InitialCart)
  
  const MAX_ITEMS=5
  const MIN_ITEMS=1

  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  },[cart])

  function addToCart(item){
    const itemExist=cart.findIndex(guitar=>guitar.id===item.id)
    if(itemExist>=0){
      if(cart[itemExist].quantity>=MAX_ITEMS)return
      const updatedCart=[...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    }else{
      item.quantity=1
      setCart(prevCart=>[...prevCart,item])
    }
  }
  function removeFromCart(id){
    setCart(prevCart=>prevCart.filter(guitar=>guitar.id!== id))
  }
  function ManageQuantity(id,value){
    const updatedCart=cart.map(item=>{
      if(item.id==id &&item.quantity+value<=MAX_ITEMS && item.quantity+value>=MIN_ITEMS ){
        return {
          ...item,
          quantity: item.quantity+value
        }
        
      }
      return item
    })
    //updatedCart=updatedCart.filter(item=>item.quantity!==0)
    setCart(updatedCart)
  }

  function clearCart(){
    setCart([])
  }

  return (
    <>
      <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      ManageQuantity={ManageQuantity}
      clearCart={clearCart}
      />
  

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=>(
                  <Guitar
                    key={guitar.id}
                    guitar={guitar}
                    addToCart={addToCart}
                  />
              ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
