import { Link } from "react-router-dom";
import '../../css/NotFound.css';

const NotFound = () => {
  return (
    <section className="notfound-container">
      <img src="/notfound.png" alt="Page Not Found" className="notfound-img" />
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-message">Oops! Page Not Found</h2>
      <p className="notfound-message">The page you're looking for doesn’t exist or has been moved.</p>
      <Link className="notfound-btn" to="/">Return to Home</Link>
    </section>
  );
};

export default NotFound;
