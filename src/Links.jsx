import { Link } from 'react-router-dom';

function Links() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <br />
        <Link to="/health-history">Health History</Link>
        <br />
        <Link to="/book-now">Book Now</Link> 
      </nav>
    </header>
  );
}

export default Links;