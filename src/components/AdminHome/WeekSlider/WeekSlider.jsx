import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function WeekSlider() {



    const [selectedDate, setSelectedDate] = useState(new Date());

function getWeekRange(date) {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return { start: startOfWeek, end: endOfWeek };
}

const handlePreviousWeek = () => {
  const newDate = new Date(selectedDate);
  newDate.setDate(newDate.getDate() - 7);
  setSelectedDate(newDate);
};

const handleNextWeek = () => {
  const newDate = new Date(selectedDate);
  newDate.setDate(newDate.getDate() + 7);
  setSelectedDate(newDate);
};

const dateRange = getWeekRange(selectedDate);

  return (
    <section>
    <h2>Sélectionnez une semaine :</h2>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <button className='btn btn-sm' onClick={handlePreviousWeek}>
        <FaChevronLeft size={20} />
      </button>
      <p style={{ margin: '0 20px' }}>
        Du {dateRange.start.toLocaleDateString()} au {dateRange.end.toLocaleDateString()}
      </p>
      <button className='btn btn-sm' onClick={handleNextWeek}>
        <FaChevronRight size={20} />
      </button>
    </div>
  </section>
  )
}

export default WeekSlider