import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import { CarContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
    <CarContextProvider>
    <Header />
    <Meals />
    <Cart />
    </CarContextProvider>
    </UserProgressContextProvider>

  );
}

export default App;
