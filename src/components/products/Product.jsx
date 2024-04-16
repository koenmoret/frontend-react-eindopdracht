// eslint-disable-next-line react/prop-types
function Product({image, altText, title, text, disabled }) {

    return (
        <>
            <div className="product">
                <img src={image} alt={altText}/>
                <h4>{title}</h4>
                <p>{text}</p>
                <button disabled={disabled} type="button" className="btn btn-primary" >Aanschaffen 25,-</button>
            </div>
        </>
    );
}

export default Product;
