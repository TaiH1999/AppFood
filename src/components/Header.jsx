import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import userProgressContext from '../store/UserProgressContext';

export default function Header(){
    const CartCtx =    useContext(CartContext);
    const userProgressCtx = useContext(userProgressContext);
    // use length not enot bcs we add every items onece and after only increase quantity
    // so that we can use reduce method. This is function than allow us to reduce array to a single value or number
    //reduce take a function is a first argument  and starting 0 as a second argument
    //And a function we past first argument that itself recive 2 argument than it generated by React
    //And after the second argument value every item of array we call reduce step by step item by item bcs function will execution once every item in that array
    const totalCartItems = CartCtx.items.reduce( 
    (totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }
    
    return(
        <header id="main-header">
        <div id="title">
        <img src={logoImg} alt='The restaurant logo'/>
            <h1 >
                React Food Order Shop
            </h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
        </header>
    )
}