import React from 'react'
import Sidebar from './Sidebar.jsx'
import MessageContainer from './MessageContainer.jsx'

const HomePage = () => {
  return (
    <div className="p-4 h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-sky-500">
      <div className="flex sm:h-[450px] md:h-[550px] rounded-2xl shadow-2xl overflow-hidden bg-white bg-opacity-30 backdrop-blur-lg">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
  
}

export default HomePage