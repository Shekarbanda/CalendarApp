import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Sidebar from './components/Sidebar';
import './index.css';
import EventList from './components/EventList';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('calendar'); // Default to calendar view
  const [events, setEvents] = useState([]);

   useEffect(() => {
    fetch('/events.json')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        currentView={currentView}
        setView={(view) => {
          setCurrentView(view);
          if (isSidebarOpen) toggleSidebar(); // Close sidebar on mobile after selection
        }}
      />
      <div className="flex w-full justify-center p-4 md:ml-64">
        {currentView === 'calendar' && <Calendar events={events}/>}
        {currentView === 'events' && (
          <EventList events={events} onDeleteEvent={handleDeleteEvent} />
        )}
        {currentView === 'notifications' && (
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <p className="text-gray-600">You have 2 new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;