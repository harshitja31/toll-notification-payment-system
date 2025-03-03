import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Toll System</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/tolls" className="text-white hover:underline">
              Nearby Tolls
            </Link>
          </li>
          <li>
            <Link to="/payment" className="text-white hover:underline">
              Payments
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
