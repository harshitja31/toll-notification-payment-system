import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to Toll Notification System</h1>
      <Link to="/tolls" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow">
        View Nearby Tolls
      </Link>
    </div>
  );
};

export default Home;
