import React, { useState, useEffect, useRef } from "react";
import "../Style/index.css";
import Sidebar from "../Components/Sidebar";
import StatusCard from "../Components/StatusCard";
import "../Style/StatusCard.css";

function Home() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref to store multiple container refs
  const containerRefs = useRef({});

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/logs/time`);
      const data = await res.json();
      setLogs(data.data);
    } catch (error) {
      console.log("Error : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    // Scroll each container to the end when logs update
    Object.keys(containerRefs.current).forEach((key) => {
      const container = containerRefs.current[key];
      if (container) {
        container.scrollLeft = container.scrollWidth;
      }
    });
  }, [logs]);

  const getStatusIcon = (status) => {
    if (status === 200 || status === 304 || (status >= 100 && status < 400)) {
      return "✔️";
    } else if (status >= 400 && status < 600) {
      return "❌";
    }
    return "";
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <p className="heading">Home</p>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {Object.keys(logs).map((baseEndpoint) => (
                <div key={baseEndpoint} className="status-container-wrapper">
                  <p className="date-heading">{baseEndpoint}</p>
                  <div
                    className="status-container"
                    ref={(el) => (containerRefs.current[baseEndpoint] = el)}
                  >
                    {logs[baseEndpoint].map((log) => (
                      <StatusCard key={log.traceId} log={log} />
                    ))}
                  </div>
                  {/* Icon at top-right */}
                  {logs[baseEndpoint].length > 0 && (
                    <span className="status-icon">
                      {getStatusIcon(
                        logs[baseEndpoint][logs[baseEndpoint].length - 1].status
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
