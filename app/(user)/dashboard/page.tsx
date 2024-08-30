import React from 'react';

const PokerTable = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-800 via-red-500 to-red-800 flex justify-center items-center p-4">
      <div className="relative w-full max-w-4xl bg-green-600 rounded-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden shadow-xl">
        
        {/* Pot and Round Info */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-700 text-white p-4 rounded-lg text-center">
          <p>Pot: $400.00</p>
          <p>Last bet Val: $50.00</p>
          <p>Phase: ClosingPreFlop</p>
          <p>Round Raise: 1</p>
        </div>
        
        {/* Player Positions */}
        <div className="absolute left-1/2 top-[10%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="bg-blue-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white">
            <p>YOU</p>
          </div>
          <div className="bg-red-600 p-2 mt-2 text-white rounded-full">CALL</div>
        </div>

        <div className="absolute left-[10%] top-[25%] transform -translate-y-1/2 flex flex-col items-center">
          <div className="bg-blue-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white">
            <p>Nova</p>
          </div>
          <div className="bg-green-600 p-2 mt-2 text-white rounded-full">$259.00</div>
        </div>

        <div className="absolute right-[10%] top-[25%] transform -translate-y-1/2 flex flex-col items-center">
          <div className="bg-blue-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white">
            <p>Jeel</p>
          </div>
          <div className="bg-green-600 p-2 mt-2 text-white rounded-full">$259.00</div>
        </div>

        <div className="absolute left-[10%] bottom-[25%] transform translate-y-1/2 flex flex-col items-center">
          <div className="bg-blue-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white">
            <p>Neel</p>
          </div>
          <div className="bg-green-600 p-2 mt-2 text-white rounded-full">$259.00</div>
        </div>

        <div className="absolute right-[10%] bottom-[25%] transform translate-y-1/2 flex flex-col items-center">
          <div className="bg-blue-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white">
            <p>Jack</p>
          </div>
          <div className="bg-green-600 p-2 mt-2 text-white rounded-full">$400,000</div>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex flex-wrap space-x-2 justify-center">
          <button className="bg-yellow-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg">Main Menu</button>
          <button className="bg-yellow-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg">Show Result</button>
          <button className="bg-yellow-600 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg">Next Hand</button>
        </div>
      </div>
    </div>
  );
};

export default PokerTable;
