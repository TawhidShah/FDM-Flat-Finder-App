export default function Property(props) {
  return (
    <div>
      <div id="propertyCard">
        <div id="picture">
          <img src={props.image} alt="Property"></img>
        </div>
        <div id="info">
          <h1>{props.description}</h1>
          <h1>{props.address}</h1>
          <p>{props.numBath} bathrooms</p>
          <h1>{props.price}</h1>
          <p>{props.estateAgent}</p>
          <br></br>
          <br></br>
          <p id="propertySummary">{props.summary}</p>
        </div>
      </div>
    </div>
  );
}
