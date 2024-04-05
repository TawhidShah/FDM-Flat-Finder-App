const ListingCard = ({ listing }) => {
  const title =
    listing.title.length > 25
      ? listing.title.substring(0, 25) + "..."
      : listing.title;

  return (
    <div
      key={listing.id}
      className="flex flex-col justify-between gap-3 overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <img
        className="h-56 w-full rounded-lg object-cover object-center"
        src={listing.images[0] || "https://via.placeholder.com/300"}
        alt={listing.title}
      />
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">{listing.description}</p>
      <div className="mt-3 flex justify-between p-1">
        <span className="text-sm text-gray-600">{listing.city}</span>
        <span className="text-md text-gray-600">£{listing.price}</span>
      </div>
    </div>
  );
};

export default ListingCard;
