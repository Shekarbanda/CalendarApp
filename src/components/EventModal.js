import React, { useEffect, useRef } from 'react';
import { parse, differenceInMinutes } from 'date-fns';

const EventModal = ({ isOpen, closeModal, events, selectedDate }) => {
  const dateEvents = events.filter((event) => event.date === selectedDate);

  const modalRef = useRef(null);

  const calculateDuration = (startTime, endTime) => {
    const dummyDate = new Date(2025, 5, 14);
    const start = parse(startTime, 'HH:mm', dummyDate);
    const end = parse(endTime, 'HH:mm', dummyDate);
    const duration = differenceInMinutes(end, start);
    if (duration < 0) {
      throw new Error('endTime must be after startTime');
    }
    return duration;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-25" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <div
            ref={modalRef}
            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl"
          >
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Events on {selectedDate}
            </h3>
            <div className="mt-2">
              {dateEvents.length > 0 ? (
                dateEvents.map((event) => (
                  <div key={event.id} className="border-b py-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-semibold text-gray-800">{event.title}</h4>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex flex-col justify-center text-sm text-gray-600">
                        <div>
                          <span className="mr-2">Time:</span>
                          <span>
                            {event.startTime} ({event.duration} mins)
                          </span>
                        </div>
                        <div>
                          <span className="mr-2">Duration:</span>
                          <span>
                            {calculateDuration(event.startTime, event.endTime)} mins
                          </span>
                        </div>
                      </div>
                      {event.recurrence !== 'none' && event.days && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-2">Days:</span>
                          <span>{event.days.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No events scheduled.</p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventModal;