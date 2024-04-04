"use client"
import { useState } from 'react';
import InternalListings from "@/components/InternalListings";
import ExternalListings from './external/page'; 

const listingsPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tabs">
        <button className={activeTab === 'tab1' ? 'active' : ''} onClick={() => handleTabChange('tab1')}>Internal</button>
        <button className={activeTab === 'tab2' ? 'active' : ''} onClick={() => handleTabChange('tab2')}>External</button>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && < InternalListings />}
        {activeTab === 'tab2' && <ExternalListings />}
      </div>

      <style jsx>{`
        .tabs {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }

        .tabs button {
          border: none;
          background-color: transparent;
          padding: 10px 20px;
          cursor: pointer;
          outline: none;
          font-size: 16px;
          margin-right: 10px;
        }

        .tabs button.active {
          font-weight: bold;
        }

        .tab-content {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default listingsPage;


/*import React, { useState, useEffect } from 'react';

function ListingsPage() {
  const [showExternal, setShowExternal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#ffeeb4');

  useEffect(() => {
    function handleScroll(event) {
      if (event.deltaX > 0) {
        setShowExternal(true);
        setBackgroundColor('#c0ffee'); // Change to your desired color for external
      } else {
        setShowExternal(false);
        setBackgroundColor('#ffeeb4'); // Change to your desired color for internal
      }
    }

    function handleKeyPress(event) {
      if (event.key === 'ArrowRight') {
        setShowExternal(true);
        setBackgroundColor('#c0ffee');
      } else if (event.key === 'ArrowLeft') {
        setShowExternal(false);
        setBackgroundColor('#ffeeb4');
      }
    }

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const toggleListings = () => {
    setShowExternal(!showExternal);
    setBackgroundColor(showExternal ? '#ffeeb4' : '#c0ffee');
  };

  return (
    <div className="container mx-auto mt-35 p-4" style={{ backgroundColor: backgroundColor }}>
      <h1 className="text-3xl font-bold">Choose Listing Type</h1>
      <div className="mt-4">
        {showExternal ? (
          <p>
            <b>External Listings</b> are listings from third-party providers. You could make your search and than create a lisitng on this page to find a roomate!
          </p>
        ) : (
          <p>
            <b>Internal listings</b> are listings managed within our platform from our own users! This way you could directly move in with a roomate already
          </p>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={toggleListings}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {showExternal ? '← Show Internal Listings' : 'Show External Listings →'}
        </button>
        <div className="flex mt-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            <a href="listings/internal" className="text-white">Internal Listings</a>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <a href="/listings/external" className="text-white">External Listings</a>
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Create Your Listing</h2>
        <p className="mt-2">Do you already have a listing? create a lisitng to find a roomate!</p>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
          <a href="/listings/create" className="text-white">Create Listing</a>
        </button>
      </div>
    </div>
  );
}
export default ListingsPage;
*/