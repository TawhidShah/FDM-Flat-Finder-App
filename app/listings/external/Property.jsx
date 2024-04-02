import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
export default function Property(props) {
  return (
    <div>
      <div id="propertyCard">
        <div id="picture">
          <Carousel>
            <CarouselContent>
              {props.images.map((picture) => <CarouselItem>
                <img src={picture.srcUrl} alt="Property Image"></img>
              </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious></CarouselPrevious>
            <CarouselNext></CarouselNext>
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
        </div>
      </div>
    </div>
  );
}
