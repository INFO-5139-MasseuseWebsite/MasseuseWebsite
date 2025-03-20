import { Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* ✅ Sidebar will always be visible */}
        <div className="main-content">
          <Routes>
            <Route path="/health-history" element={<HealthHistory />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/full-calendar-view" element={<FullCalendarView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default Links;