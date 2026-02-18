import { Outlet } from "react-router";
import { Link } from "react-router";
import Navbar from "../root/Components/Navbar/Navbar";
import Footer from "../root/Components/Footer/Footer";
import NavigateBar from "@/root/Components/NavigateBar/NavigateBar";
import NavbarWithNavigation from "@/root/Components/NavbarWithNavigation/NavbarWithNavigation";
import { ThemeProvider } from "@/components/Theme/theme-provider";

const RootLayout = () => {
  return (
    <div className="bg-amber-50">
      <ThemeProvider>
        <div className="container mx-auto">
          <header>
            <NavbarWithNavigation />
            <div className="hidden lg:block"></div>
          </header>
          <main>
            <Outlet />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default RootLayout;
