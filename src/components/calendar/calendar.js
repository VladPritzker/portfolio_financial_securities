import React, { useState, useEffect } from 'react';
import './calendar.css';

const Calendar_2024 = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayDetails, setDayDetails] = useState({ wokeUp: '', slept: '', studied: false });
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);

  

  const fetchCalendarData = () => {
    fetch('http://localhost:4000/api/calendar')
      .then((response) => response.json())
      .then((data) => {
        setCalendarData(data);
      })
      .catch((error) => {
        console.error('Error fetching calendar data:', error);
      });
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const handleDayClick = (day) => {
    setSelectedDay(selectedDay === day.date ? null : day.date);
    setDayDetails({
      wokeUp: day.wokeUp || '',
      slept: day.slept || '',
      studied: day.studied || false,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDayDetails({ ...dayDetails, [name]: value });
  };

  const handleStudiedChange = (e) => {
    setDayDetails({ ...dayDetails, studied: e.target.checked });
  };

  


  const handleUpdateCalendarDay = () => {
    const dayToUpdate = calendarData.find(day => day.date === selectedDay);
    if (!dayToUpdate) return;
  
    fetch(`http://localhost:4000/api/calendar/${selectedDay}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wokeUp: dayDetails.wokeUp,
        slept: dayDetails.slept,
        studied: dayDetails.studied,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(json => Promise.reject(json));
      }
      return response.json();
    })
    .then(data => {
      setShowConfirmationBox(true); // Show confirmation box
      setSelectedDay(null); // Close modal
      fetchCalendarData(); // Refresh calendar data
      console.log(data.message); // Assuming the server sends back a message field
    })
    .catch(error => {
      console.error('Error updating calendar day:', error);
    });
  };
  
  return (
    <div className="calendar-container"> 
    {showConfirmationBox && (
        <div className="confirmation-box">
          <p>Calendar updated successfully</p>
          <button onClick={() => setShowConfirmationBox(false)}>Close</button>
        </div>
      )}
      {calendarData.map((day) => (
        <div 
        key={day.date} 
        className={`calendar-day ${day.studied ? 'calendar-day-studied' : 'calendar-day-not-studied'}`}
        onClick={() => handleDayClick(day)}
      >
          {day.date}
        </div>
      ))}

{selectedDay && (
  <div className="day-details-modal">
    <div className="day-details-content">
      <h2>Details for Day {selectedDay}</h2>
      <input
        type="text"
        name="wokeUp"
        placeholder="Woke Up Time"
        value={dayDetails.wokeUp}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="slept"
        placeholder="Slept Time"
        value={dayDetails.slept}
        onChange={handleInputChange}
      />
      <label>
        Studied:
        <input
          type="checkbox"
          checked={dayDetails.studied}
          onChange={handleStudiedChange}
        />
      </label>
      <button type='close' onClick={() => setSelectedDay(null)}>Close</button>
      <button onClick={handleUpdateCalendarDay}>Save</button>
    </div>
  </div>
)}



    </div>
  );
};

export default Calendar_2024;
