export function cartReducer(cartState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...cartState,
        cart: [...cartState.cart, { ...action.payload, qty: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...cartState,
        cart: update(cartState, action),
      };
    case "CHANGE_QTY":
      return {
        ...cartState,
        cart: quantity(cartState, action),
      };
    default:
      break;
  }
}

function update(cartState, action) {
  return cartState.cart.filter((prod) => prod.id !== action.payload.id);
}

function quantity(cartState, action) {
  return cartState.cart.filter((prod) =>
    prod.id === action.payload.id ? (prod.qty = action.payload.qty) : prod.qty
  );
}
export function productReducer(productState , action) {
    switch (action.type) {
        case "SORT_BY_PRICE":
            return {
                ...productState,
                sort : action.payload
            }
        
        case "FILTER_BY_DELIVERY":
            return{
                ...productState,
                byQuickDelivery: !(productState.byQuickDelivery)
            }
    
        case "FILTER_BY_STOCK" :
            return {
                ...productState,
                byStock: !(productState.byStock)
            }
        
        case "CLEAR_FILTERS":
            return {
                byStock: false,
                byQuickDelivery: false,
                byRating: 0,
            }
        case "FILTER_BY_SEARCH":
            return{
                ...productState,
                searchQuery: action.payload
            }

        case "FILTER_BY_RATING":
          return {
            ...productState,
            byRating : action.payload
          }
          
        default:
            break;
    }
}
