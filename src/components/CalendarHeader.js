import React, { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths, setMonth, setYear } from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiSearch, FiPlus, FiChevronDown } from 'react-icons/fi';

const CalendarHeader = ({ currentDate, setCurrentDate, openAddEventModal }) => {
  const currentMonth = format(currentDate, 'M') - 1; 
  const currentYear = format(currentDate, 'yyyy');


  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [customYear, setCustomYear] = useState('');
  const [yearError, setYearError] = useState('');

  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  // Array of month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate years: current year, previous 5 years, next 5 years (2020–2030 for 2025)
  const currentYearNum = Number(currentYear);
  const years = Array.from({ length: 11 }, (_, i) => currentYearNum - 5 + i);

  // Handle month selection
  const handleMonthSelect = (monthIndex) => {
    setCurrentDate(setMonth(currentDate, monthIndex));
    setIsMonthDropdownOpen(false);
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    setCurrentDate(setYear(currentDate, year));
    setIsYearDropdownOpen(false);
  };

  // Handle custom year input
  const handleCustomYearChange = (e) => {
    const value = e.target.value;
    setCustomYear(value);

    // Validate year format (4 digits)
    if (value.length === 4 && /^\d{4}$/.test(value)) {
      const yearNum = Number(value);
      if (yearNum >= 1900 && yearNum <= 2100) { // Reasonable year range
        setCurrentDate(setYear(currentDate, yearNum));
        setYearError('');
        setIsYearDropdownOpen(false);
      } else {
        setYearError('Year must be between 1900 and 2100');
      }
    } else if (value.length > 0 && value.length < 4) {
      setYearError('Year must be 4 digits');
    } else {
      setYearError('');
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target)) {
        setIsMonthDropdownOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setIsYearDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 p-4 bg-white shadow rounded-lg">
      <div className="flex items-center mb-4 sm:mb-0 space-x-2">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <FiChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex space-x-5">
          {/* Custom Month Dropdown */}
          <div className="relative" ref={monthDropdownRef}>
            <button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className="flex items-center text-xl min-w-[150px] font-semibold text-gray-800 border rounded-lg p-2 hover:bg-gray-100 transition"
            >
              {months[currentMonth]}
              <FiChevronDown className="ml-2 w-5 h-5" />
            </button>
            {isMonthDropdownOpen && (
              <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {months.map((month, index) => (
                  <div
                    key={month}
                    onClick={() => handleMonthSelect(index)}
                    className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                  >
                    {month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Custom Year Dropdown */}
          <div className="relative" ref={yearDropdownRef}>
            <button
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className="flex items-center text-xl w-[100px] font-semibold text-gray-800 border rounded-lg p-2 hover:bg-gray-100 transition"
            >
              {currentYear}
              <FiChevronDown className="ml-2 w-5 h-5" />
            </button>
            {isYearDropdownOpen && (
              <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {/* Custom Year Input */}
                <div className=" py-2 px-1 border-b">
                  <input
                    type="text"
                    value={customYear}
                    onChange={handleCustomYearChange}
                    placeholder="Enter year"
                    className="w-full border rounded-lg p-1 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="4"
                  />
                  {yearError && (
                    <p className="text-red-500 text-xs mt-1">{yearError}</p>
                  )}
                </div>
                {/* Year Options */}
                {years.map((year) => (
                  <div
                    key={year}
                    onClick={() => handleYearSelect(year)}
                    className="px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <FiChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
     
        <button
          onClick={openAddEventModal}
          className="flex items-center px-4 py-2 bg-[rgb(4,58,64)] text-white rounded-lg hover:bg-[rgb(4,58,64)"
        >
          <FiPlus className="mr-2" />
          Add Event
        </button>
      </div>

  );
};

export default CalendarHeader;