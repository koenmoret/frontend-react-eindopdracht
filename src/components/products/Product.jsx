// eslint-disable-next-line react/prop-types
function Product({image, altText, title, text, disabled, product }) {

    const handleButtonClick = () => {
        product[0](product[1]);
    };

    return (
        <>
            <div className="product">
                <img src={image} alt={altText}/>
                <h4>{title}</h4>
                <p>{text}</p>
                <button disabled={disabled} type="button" className="btn btn-primary" onClick={handleButtonClick}>Aanschaffen 25,-</button>
            </div>
        </>
    );
}

export default Product;
