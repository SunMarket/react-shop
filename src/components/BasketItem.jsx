function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
        deleteFromBasket = Function.prototype,
        incQuantity = Function.prototype,
        decQuantity = Function.prototype,
    } = props;

    return (
        <li className="collection-item">
            {name} <i className="material-icons basket-change" onClick={() => decQuantity(id)}>remove</i> x<b>{quantity}</b> шт <i className="material-icons basket-change" onClick={() => incQuantity(id)}>add</i> = {price * quantity} руб.
            <span className="secondary-content">
                <i className="material-icons basket-delete" onClick={() => deleteFromBasket(id)}>close</i>
            </span>
        </li>
    )
}

export {BasketItem};