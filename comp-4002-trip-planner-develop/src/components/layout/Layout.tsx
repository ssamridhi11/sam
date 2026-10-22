import { Outlet } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Nav from "./Nav";

// this wraps around every page in the app
// the header nav and footer stay the same, only the middle changes when you click a link
function Layout() {
  return (
    // empty tags because were returning a few things and it only allows one
    <>
      <Header />
      <Nav />

      <main>
        {/* whatever page youre on gets rendered right here */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

// need this so App.tsx can pull the component in
export default Layout;