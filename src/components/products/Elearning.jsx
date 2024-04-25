// eslint-disable-next-line react/prop-types
function Elearning({image, altText, title, text, btntext, disabled, action  }) {

    const handleButtonClick = () => {
        action();
    };

    return (
        <>
            <div className="product">
                <img src={image} alt={altText}/>
                <h4>{title}</h4>
                <p>{text}</p>
                <button disabled={disabled} type="button" className="btn btn-primary" onClick={handleButtonClick}>{btntext}</button>
            </div>
        </>
    );
}

export default Elearning;
