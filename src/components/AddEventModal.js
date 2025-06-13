import React, { useState, useEffect, useRef } from 'react';
import { parse, differenceInMinutes } from 'date-fns';

const AddEventModal = ({ isOpen, closeModal, addEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeError, setTimeError] = useState(''); 

  // Ref for the modal content
  const modalRef = useRef(null);
  useEffect(() => {
    if (startTime && endTime) {
      const dummyDate = new Date(2025, 5, 14);
      const start = parse(startTime, 'HH:mm', dummyDate);
      const end = parse(endTime, 'HH:mm', dummyDate);
      const duration = differenceInMinutes(end, start);

      if (duration <= 0) {
        setTimeError('End time must be after start time');
      } else {
        setTimeError(''); 
      }
    } else {
      setTimeError('');
    }
  }, [startTime, endTime]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (timeError) return;

    const newEvent = {
      id: Date.now(),
      title,
      date,
      startTime,
      endTime,
      color: 'blue',
    };
    addEvent(newEvent);
    closeModal();
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

  if (!isOpen) return null;

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
              Add New Event
            </h3>

       
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {timeError && (
                  <p className="mt-1 text-sm text-red-500">{timeError}</p>
                )}
              </div>

          
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!!timeError} 
                  className={`px-4 py-2 rounded-lg text-white ${
                    timeError
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[rgb(4,58,64)] hover:bg-[rgb(14,116,109)]'
                  }`}
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEventModal;