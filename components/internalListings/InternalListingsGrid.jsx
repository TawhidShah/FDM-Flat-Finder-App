import InternalListingCard from "./InternalListingCard";

const InternalListingsGrid = ({ listings }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 px-16 pb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {listings.map((listing) => (
        <InternalListingCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
};

export default InternalListingsGrid;
