function Property(props) {
    return (<div>
        <div id="propertyCard">
            <div id="mainInfo">
                <h1>{props.description}</h1>
                <h1>{props.address}</h1>
                <p>{props.numBath} bathrooms</p>
            </div>
            <div id="price">
                <h1>{props.price}</h1>
            </div>
        </div>
        <img src={props.image} alt="Property"></img>
    </div>)
}
export default Property