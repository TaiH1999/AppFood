import { createContext, useReducer } from "react";

// context create by createContext in the end is the object has provide the property and has Provider property
//then is a component can be output and should wrap any component that need to access to the contedxt
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
 });

//useReducer in React need a reducer function as a input
//userReducer return update state and action object wil tell how to update this state
function cartReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        //Warning not be a good idea when update state like this: state.items.push(action.item);
        //The first important: is we should never mutate existing state , bcs Push method will edit existing item array
        //That already stored in memory that it would be changed state value before cartReducer executed done
        //And if you have a code ex: return some other state under certain conditions you would change the items
        //SO that you made a change before executed the code is may crack your data
        //The second we don't want add new item into item array bcs if we click add to cart button multipie times , we don't want more 10 same items in array every click
        //we need add the  once and then just increase quantity property that connected to the meal 
        // so that we don't need the cart have 10 list with the same item instead we need 1 item but can increas quantity of 10. 
        
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
                        //That gices us a existing item in that item array
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
 