import { createContext, useReducer } from "react";

// context create by createContext in the end is the object has provide the property and has Provider property
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
 });

//useReducer in React need a reducer function as a input
//userReducer return update state and action object wil tell how to update this state
function cartRedustate, action){
    if(action.type === 'ADD_ITEM'){ 
        
        const existingCartItemIndex = state.items.findIndex(
                (item) => item.id = action.item.id
            );
            //findIndex method build in javascript. this method take a function as a input a function that executed on every items in item array
            // and it should return to true if we found a item and false otherwise

            const updatedItems = [...state.items];

            if (existingCartItemIndex > -1){
                
                const existingItem = state.items[existingCartItemIndex];
                        //findIndex will return -1 as a value if not can't find items.
                    const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                }
                //Override existing Items when increase quantity
                updatedItems[existingCartItemIndex] = updatedItem;
            } else{
                updatedItems.push({...action.item, quantity: 1});
            };


            return {...state, items: updatedItems };
        }
         
    if(action.type === 'REMOVE_ITEM'){  
        const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.id
            );
            
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if(existingCartItem.quantity === 1){
            
            //splice method take an index( existingCartItemIndex) and number of item should be spilice(remove)
            updatedItems.splice(existingCartItemIndex, 1)
        } else{
            const updatedItem = {
                ...existingCartItem, 
                quantity: existingCartItem.quantity -1,
                                };
            updatedItems[existingCartItemIndex] = updatedItem;
        };

        return {...state, items: updatedItems };
    };
}
 export function CarContextProvider({children}){
    const [cart, dispatchCartAction ] = useReducer(cartReducer, { items: [] });
     

    function addItem(item) {
        dispatchCartAction({
            type: 'ADD_ITEM', 
            item
        })
    };

    function removeItem(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id
        })
    };

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,        
    };
    

    return <CartContext.Provider value={cartContext}>
        {children}
        </CartContext.Provider>
 };

 export default CartContext;
 
