import React from 'react';
import { FiMenu, FiX, FiCalendar, FiActivity, FiBell } from 'react-icons/fi';
import { FaRegUserCircle } from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar, currentView, setView }) => {
  return (
    <>
      <button
        className="md:hidden p-4 text-gray-600 flex"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div
          className="cursor-pointer pl-3 flex items-center h-[3.2rem] lg:h-[4.3rem] text-[1rem] lg:text-[1.5rem] font-bold"
        >
          <span className="bg-[rgb(4,58,64)] p-1 rounded-lg text-[white]">Calendar</span>{" "}
          <span>App</span>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setView('calendar')}
                className={`w-full flex items-center p-4 text-[rgb(4,58,64)] ${
                  currentView === 'calendar' ? 'bg-[rgba(4,58,64,0.2)]' : 'hover:bg-[rgba(4,58,64,0.2)]'
                }`}
              >
                <FiCalendar className="w-5 h-5 mr-3" />
                Calendar
              </button>
            </li>
            <li>
              <button
                onClick={() => setView('events')}
                className={`w-full flex items-center p-4 text-[rgb(4,58,64)] ${
                  currentView === 'events' ? 'bg-[rgba(4,58,64,0.2)]' : 'hover:bg-[rgba(4,58,64,0.2)]'
                }`}
              >
                <FiActivity className="w-5 h-5 mr-3" />
                Events
              </button>
            </li>
            <li>
              <button
                onClick={() => setView('notifications')}
                className={`w-full flex items-center p-4 text-[rgb(4,58,64)] ${
                  currentView === 'notifications' ? 'bg-[rgba(4,58,64,0.2)]' : 'hover:bg-[rgba(4,58,64,0.2)]'
                }`}
              >
                <FiBell className="w-5 h-5 mr-3" />
                Notifications
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">2</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-4 p-4 flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3">
            <FaRegUserCircle className="w-10 h-10 rounded-full mr-3" />
          </div>
          <span className="text-gray-600">Guest123</span>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;