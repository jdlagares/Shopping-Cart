import {useState,useEffect} from "react"
import { db } from "../data/db"
import { useMemo } from "react"
 export const useCart = ()=>{
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

      const isEmpty= useMemo(()=>cart.length===0,[cart])
    const cartTotal=useMemo(()=> cart.reduce((total, item)=>total+(item.quantity*item.price),0),[cart])
    return{
        data,
        cart,
        addToCart,
        removeFromCart,
        ManageQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

