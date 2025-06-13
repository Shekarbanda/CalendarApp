import React from 'react';
import { parse, isBefore } from 'date-fns';

const EventList = ({ events,onDeleteEvent }) => {
  

   const futureEvents = events.filter((event) => {
    const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
    return !isBefore(eventDate, new Date(Date.now()));
  });
  const completedEvents = events.filter((event) => {
    const eventDate = parse(event.date, 'yyyy-MM-dd', new Date());
    return isBefore(eventDate, new Date(Date.now()));
  });

  console.log(events)
  return (
    <div className="md:w-[60vw] w-full mx-auto p-4 space-y-6">
      {/*Future Events */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Future Events</h2>
        {futureEvents.length > 0 ? (
          <div className="space-y-3">
            {futureEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 p-4"
                
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <div className="mt-1 text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Date:</span> {event.date}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="px-3 py-1 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No future events.</p>
        )}
      </div>

      {/*Completed Events */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completed Events</h2>
        {completedEvents.length > 0 ? (
          <div className="space-y-3">
            {completedEvents.map((event) => {

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4"
                  
                >
                  <div
           
                    className="flex flex-col justify-center p-4 cursor-pointer"
                  >
                    <h3 className="text-lg font-medium line-through text-gray-500">
                      {event.title}
                    </h3>
                    <p className='text-gray-500'>Completed: {event.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No completed events.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;