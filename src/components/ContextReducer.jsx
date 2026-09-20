import { createContext, useReducer, useContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, unitPrice: action.unitPrice, qty: action.qty, size: action.size, img: action.img }];
        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id && food.size === action.size) {
                    return { ...food, qty: food.qty + parseInt(action.qty) };
                }
                return food;
            });
        case "INCREMENT":
            return state.map((food, index) => {
                if (index === action.index) {
                    return { ...food, qty: food.qty + 1 };
                }
                return food;
            });
        case "DECREMENT":
            return state
                .map((food, index) => {
                    if (index === action.index) {
                        return { ...food, qty: food.qty - 1 };
                    }
                    return food;
                })
                .filter((food) => food.qty > 0);
        case "REMOVE":
            return state.filter((item, index) => index !== action.index);
        case "DROP":
            return [];
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
