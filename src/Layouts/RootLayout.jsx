import { Outlet } from "react-router";
import { Link } from "react-router";
import Navbar from "../root/Components/Navbar/Navbar";
import Footer from "../root/Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div className="bg-amber-50">
      <div className="container mx-auto">
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
