const ListingSmall = ({ listing }) => {

    return (
        <div className="listing">
            <div className="listingContent">
                <p>{listing?.country}</p>
                <p>{listing?.city}</p>
                <p>{listing?.adresss}</p>
            </div>
            <div className="img">TEMP</div>
        </div>
    );
}
 
export default ListingSmall;