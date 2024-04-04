import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Property(props) {
  const rightmoveUrl = "https://www.rightmove.co.uk";
  return (
    <div>
      <div id="propertyCard">
        <div id="picture">
          <Carousel>
            <CarouselContent className="self-center">
              {props.images.map((picture) => (
                <CarouselItem>
                  <img
                    className="mx-auto"
                    src={picture.srcUrl}
                    alt="Property Image"
                  ></img>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-28 hover:bg-gray-300" />
            <CarouselNext className="right-28 hover:bg-gray-300" />
          </Carousel>
        </div>

        <div id="info">
          <h1>{props.description}</h1>
          <h1>{props.address}</h1>
          <p>{props.numBath} bathroom(s)</p>
          <h1>{props.price}</h1>
          <p>{props.estateAgent}</p>
          <br></br>
          <br></br>
          <p id="propertySummary">{props.summary}</p>
          <br></br>
          <a href={rightmoveUrl + props.link} target="_blank">
            <button id="buttonLink">More Info</button>
          </a>
        </div>
      </div>
    </div>
  );
}