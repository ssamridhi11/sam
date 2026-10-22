import { NavLink } from "react-router-dom";

// this is the nav bar, its the links at the top for switching pages
// NavLink is like a normal link but it knows what page youre on
function Nav() {
  return (
    <nav>
      {/* the to has to match the paths we set up in App.tsx */}
      <NavLink to="/itinerary">Itinerary</NavLink>
      <NavLink to="/packing">Packing</NavLink>
      <NavLink to="/photos">Photos</NavLink>
    </nav>
  );
}

// need this so App.tsx can pull the component in
export default Nav;
