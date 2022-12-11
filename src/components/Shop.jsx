import React, {useState, useEffect} from "react";
import {API_KEY, API_URL} from '../config';
import {Preloader} from './Preloader';
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem;
                }
            });
            setOrder(newOrder);
        }  
        setAlertName(item.name);      
    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const deleteFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId);
        setOrder(newOrder);
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map(el=> {
            if (el.id === itemId) {
                return {
                    ...el,
                    quantity: el.quantity + 1,
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    }

    const decQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.id === itemId) {
                if (el.quantity === 0) {
                    return {
                        ...el,
                        quantity: el.quantity,
                    }
                } else {
                    return {
                        ...el,
                        quantity: el.quantity - 1,
                    }
                }
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    }

    const closeAlert = () => {
        setAlertName('');
    }
    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {'Authorization': API_KEY}
        })
        .then(response => response.json())
        .then(data => {
            data.featured && setGoods(data.featured);
            setLoading(false);
        });
    }, []);
    return (
    <main className="container content">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
        {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
        {isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} deleteFromBasket={deleteFromBasket} incQuantity={incQuantity}  decQuantity={decQuantity} />}
        {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
    )
}

export {Shop};