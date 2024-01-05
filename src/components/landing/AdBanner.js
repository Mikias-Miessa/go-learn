// components/AdBanner.js
import { useState } from 'react';

const AdBanner = () => {
  const [showAd, setShowAd] = useState(true);

  const handleClose = () => {
    setShowAd(false);
  };

  return (
    showAd && (
      <div className="top-0 left-0 w-full bg-black p-4 text-center z-50 fixed">
        <p className="text-gray-700">This is your ad content.</p>
        <button
          className="bg-gray-300 border-none px-2 py-1 cursor-pointer"
          onClick={handleClose}
        >
          X
        </button>
      </div>
    )
  );
};

export default AdBanner;
