const WelcomeMessage = () => {
  return (
    <div className="mt-20 text-center">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
      <img src="/images/FDMLogo.png" alt="FDM logo" className="mx-auto" />

      <h1 className="mb-4 text-6xl font-bold text-white font-montserrat">
        Welcome to FDM Flat Finder
      </h1>
      <p className="mb-6 text-xl text-white font-montserrat">
        Find your perfect flat with ease.
      </p>
    </div>
  );
};

export default WelcomeMessage;
