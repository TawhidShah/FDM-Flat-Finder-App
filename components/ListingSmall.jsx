const ListingSmall = ({ listing }) => {
    console.log(listing)
    return (
        <div className="listing">
            <div className="listingContent">
                <p>{listing?.country}</p>
                <p>{listing?.city}</p>
                <p>{listing?.address}</p>
            </div>
            <div className="img">TEMP</div>
        </div>
    );
}
 
export default ListingSmall;