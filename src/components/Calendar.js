import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import EventModal from './EventModal';
import AddEventModal from './AddEventModal';

const Calendar = ({events}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  // Add new event
  const addEvent = (newEvent) => {
    events.push(newEvent);
  };
  
  // Calendar logic for monthly view
  const startDate = startOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endOfMonth(currentDate) });
  const firstDayIndex = getDay(startDate);

  // Handle date click
  const handleDateClick = (day) => {
    setSelectedDate(format(day, 'yyyy-MM-dd'));
    setIsEventModalOpen(true);
  };

  // Check for event conflicts
  const hasConflict = (date) => {
    const dateEvents = events.filter((event) => event.date === date);
    if (dateEvents.length <= 1) return false;

    for (let i = 0; i < dateEvents.length; i++) {
      for (let j = i + 1; j < dateEvents.length; j++) {
        const event1 = dateEvents[i];
        const event2 = dateEvents[j];
        const start1 = new Date(`${event1.date}T${event1.time}`);
        const end1 = new Date(start1.getTime() + event1.duration * 60000);
        const start2 = new Date(`${event2.date}T${event2.time}`);
        const end2 = new Date(start2.getTime() + event2.duration * 60000);

        if (start1 < end2 && start2 < end1) return true;
      }
    }
    return false;
  };

  return (
    <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        openAddEventModal={() => setIsAddEventModalOpen(true)}
      />
      {
        <div className="grid grid-cols-7 gap-px bg-gray-100 p-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center font-medium text-gray-600 py-2 bg-[rgb(4,58,64)] text-white">
              {day}
            </div>
          ))}
          {Array.from({ length: firstDayIndex === 0 ? 6 : firstDayIndex - 1 }).map((_, index) => (
            <div key={`empty-${index}`} className="bg-gray-50 h-32" />
          ))}
          {days.map((day) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dateEvents = events.filter((event) => event.date === dateStr);
            const isConflict = hasConflict(dateStr);

            return (
              <div
                key={day}
                onClick={() => handleDateClick(day)}
                className={`relative  p-2 h-32 cursor-pointer  transition ${
                  isToday(day) ? 'border-2 border-blue-500 rounded-lg bg-[rgba(4,58,64,0.2)] hover:bg-[rgba(4,58,64,0.2)]' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <span className={`text-lg ${isToday(day) ? 'font-bold text-[rgb(4,58,64)]' : 'text-gray-800'}`}>
                  {format(day, 'd')}
                </span>
                {isConflict && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" title="Event Conflict" />
                )}
                <div className="mt-1 space-y-1">
                  {dateEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      style={{backgroundColor:event.color}}
                      className={`text-xs  text-white p-1 rounded truncate flex items-center`}
                      title={`${event.title} at ${event.startTime}`}
                    >
                      
                    <p className={`w-full`}>{event.title}</p>
                    </div>
                  ))}
                  {dateEvents.length > 2 && (
                    <div className="text-xs text-gray-500">+{dateEvents.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      }
      <EventModal
        isOpen={isEventModalOpen}
        closeModal={() => setIsEventModalOpen(false)}
        events={events}
        selectedDate={selectedDate}
      />
      <AddEventModal
        isOpen={isAddEventModalOpen}
        closeModal={() => setIsAddEventModalOpen(false)}
        addEvent={addEvent}
      />
    </div>
  );
};

export default Calendar;