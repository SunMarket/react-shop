function GoodsItem(props) {
    const {
        id,
        name,
        decription,
        price,
        full_background,
        addToBasket = Function.prototype
    } = props;

    return  (
    <div className="card">
        <div className="card-image" id={id}>
            <img src={full_background} alt={name}/>
        </div>
        <div className="card-content">
            <span className="card-title">{name}</span>
            <p>{decription}</p>
        </div>
        <div className="card-action">
            <button className="btn" onClick={() => addToBasket({
                id,
                name,
                price,
            })}>Купить</button>
            <span className="right" style={{fontSize: "1.8rem", fontWeight: "bold"}}>{price} руб.</span>
        </div>
    </div>
    )
}

export {GoodsItem};