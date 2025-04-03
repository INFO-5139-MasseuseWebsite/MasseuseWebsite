import { Link } from 'react-router-dom';

function Links() {
  return (
    <header>
      <nav>
        <br />
        <Link to="/health-history">Health History</Link>
        <br />
        <Link to="/calendar-booking">Calendar Booking</Link> {/* ✅ Correct route */}
        <br />
      </nav>
    </header>
  );
}

export default Links;
