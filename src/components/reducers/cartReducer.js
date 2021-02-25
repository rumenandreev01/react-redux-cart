import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING,SUB_SHIPPING } from '../actions/action-types/cart-actions';

const initState = {
    items: [
        {id:1,title:'Winter body', desc: "Winter Body shoe", price:110,img:Item1},
        {id:2,title:'Adidas', desc: "Adidas shoe", price:80,img: Item2},
        {id:3,title:'Vans', desc: "Vans shoe",price:120,img: Item3},
        {id:4,title:'White', desc: "White shoe", price:260,img:Item4},
        {id:5,title:'Cropped-sho', desc: "Cropped shoe", price:160,img: Item5},
        {id:6,title:'Blues', desc: "Blues shoe",price:90,img: Item6}
    ],
    addedItems: [],
    total: 0
}

const cartReducer = (state=initState,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            let addedItem = state.items.find(item=>item.id === action.id);
            let itemAlreadyAdded = state.addedItems.find(item=>item.id === action.id);
            if (itemAlreadyAdded) {
                addedItem.quantity +=1;
                return {
                    ...state,
                    total: state.total + addedItem.price
                }
            } else {
                addedItem.quantity = 1;
                let newTotal_1 = state.total + addedItem.price
                return {
                    ...state,
                    addedItems: [...state.addedItems,addedItem],
                    total: newTotal_1
                }
            }
        case REMOVE_ITEM:
            let itemToRemove = state.addedItems.find(item=>item.id===action.id);
            let newItems = state.addedItems.filter(item=>item.id !== action.id);

            let newTotal_2 = state.total - (itemToRemove.price * itemToRemove.quantity)

            return {
                ...state,
                addedItems: newItems,
                total: newTotal_2
            }
        case SUB_QUANTITY:
            let itemToSubQuantity = state.addedItems.find(item=> item.id === action.id);
            if (itemToSubQuantity.quantity === 1) {
                    let newItems = state.addedItems.filter(item=>item.id !== action.id);
                    let newTotal = state.total - itemToSubQuantity.price;
                    return {
                        ...state,
                        addedItems: newItems,
                        total: newTotal
                    }
            } else {
                itemToSubQuantity.quantity -=1;
                let newTotal_3 = state.total - itemToSubQuantity.price;
                return {
                    ...state,
                    total: newTotal_3
                }
            }
        case ADD_QUANTITY:
            let itemToAddQuantity = state.addedItems.find(item=> item.id === action.id);
            itemToAddQuantity.quantity += 1;
            let newTotal_4 = state.total + itemToAddQuantity.price;
            return {
                ...state,
                total: newTotal_4
            }
        case ADD_SHIPPING:
                return {
                    ...state,
                    total: state.total + 6
                }
        case SUB_SHIPPING:
                return {
                    ...state,
                    total: state.total - 6
                }
        default:
            return state;
    }
}

export default cartReducer;