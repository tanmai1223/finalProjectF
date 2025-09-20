import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../Components/Sidebar";
import "../Style/Analytics.css";
import StatCard from "../Components/StatCard";

function Analytics() {
  const [date, setDate] = useState(new Date());
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchInfo = async (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/logs/analysis?year=${year}&month=${month}`
      );
      const data = await res.json();
      setInfo(data);
    } catch (error) {
      console.error("Error fetching info:", error);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo(date);
  }, [date]);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <p className="heading">Analysis</p>

        <div className="calendar-card">
          <label className="calendar-label">
            System Status &nbsp;:&nbsp;&nbsp;&lt;&nbsp;
          </label>
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="MMM yyyy"
            showMonthYearPicker
            className="month-picker"
          />
          <span>&nbsp;&gt;</span>
        </div>

        <div className="dashboard">
          {loading ? (
            <p>Loading...</p>
          ) : info ? (
            <>
              <StatCard
                title="Uptime (Per Month)"
                value={info?.uptimePercent || 0} // already 0–100
                displayText={`${Math.round(info?.uptimePercent * 10) / 10}%`}
                extra={
                  info?.lastErrorTimestamp
                    ? `Last downtime: ${new Date(
                        info.lastErrorTimestamp
                      ).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}`
                    : "Last downtime: -"
                }
                color="#00FFA3"
              />

              <StatCard
                title="Total Response Time"
                value={Math.min(info?.totalResponseTime || 0, 100)} // normalize to max 100
                displayText={
                  info?.totalResponseTime
                    ? `${Math.round(info.totalResponseTime * 10) / 10} ms`
                    : "-"
                }
                extra={
                  info?.avgResponseTime
                    ? `Avgerage Response Time: ${
                        Math.round(info.avgResponseTime * 10) / 10
                      } ms`
                    : "-"
                }
                color="#0080FF"
              />

              <StatCard
                title="Request Volume"
                value={Math.min((info?.totalRequests || 0) / 10, 100)} // scale large numbers down
                displayText={info?.totalRequests ?? 0}
                extra={
                  info?.totalRequests
                    ? `Request per week :  ${Math.round(info.totalRequests / 4)} requests`
                    : "-"
                }
                color="#FFD700"
              />

              <StatCard
                title="Error Rate"
                value={info?.errorPercent || 0} // 0–100
                displayText={`${Math.round(info?.errorPercent * 10) / 10}%`}
                extra={`Most common error: ${
                  info?.maxErrorStatus?._id ?? "-"
                } (${info?.maxErrorStatus?.count ?? "-"} Times)`}
                color="#FF4C4C"
              />
            </>
          ) : (
            <p>No data available for selected month.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
