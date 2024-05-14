import React, { useState } from 'react';
import axios from 'axios';
import './ManagerDashboard.css'; // Import the CSS file

const ManagerDashboard = () => {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [report, setReport] = useState(null);

  const handleChange = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.post('http://localhost:5000/manager/generate-report', {
        startDate: dates.startDate,
        endDate: dates.endDate,
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="dash">
    <div className="ManagerDashboard">
      <h2>Flight Manager Dashboard</h2>
      <label>
        Start Date:
        <input type="date" name="startDate" value={dates.startDate} onChange={handleChange} />
      </label>
      <label>
        End Date:
        <input type="date" name="endDate" value={dates.endDate} onChange={handleChange} />
      </label>
      <button onClick={handleGenerateReport}>Generate Report</button>
      {report && (
        <div className="report">
          <table>
            <thead>
              <tr>
                <th>Total Reservations</th>
                <th>Total Revenue</th>
                <th>Popular Destinations</th>
                <th>Average Booking Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{report.total_reservations}</td>
                <td>{report.total_revenue}</td>
                <td><pre>{report.popular_destinations}</pre></td>
                <td>{report.average_booking_value}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManagerDashboard;
