const PropertyMessageTab = ({ listingOwner }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-primary">Contact the owner</h1>
      <div className="mt-5 flex flex-col items-center">
        <div className="mb-5 flex items-center">
          <img
            src={listingOwner.profilePicture}
            alt="avatar"
            className="h-20 w-20 rounded-full"
          />
          <div className="ml-5">
            <h1 className="text-2xl font-semibold">{listingOwner.name}</h1>
            <p className="text-lg text-gray-500">{listingOwner.email}</p>
          </div>
        </div>
        <button className="rounded-lg bg-primary px-6 py-3 font-semibold text-white">
          Send message
        </button>
      </div>
    </div>
  );
};

export default PropertyMessageTab;
