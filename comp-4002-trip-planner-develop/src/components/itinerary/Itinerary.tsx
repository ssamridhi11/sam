import { useState } from "react";
import AddEntryForm from "./AddEntryForm";

// shared state comes in from App.tsx
type ItineraryProps = {
  selectedTrip: string;
  setSelectedTrip: (trip: string) => void;
};

// this is the itinerary page, it shows the schedule for a trip
// now its in state so entries can be added and removed
function Itinerary({ selectedTrip, setSelectedTrip }: ItineraryProps) {
  // flattened this out so each entry carries its own date
  // way easier to add and remove from one list than a nested one
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "October 9, 2026",
      time: "4:00 PM",
      place: "Paris",
      note: "Depart, meet at the hotel lobby",
    },
    {
      id: 2,
      date: "October 9, 2026",
      time: "7:30 PM",
      place: "Les Deux Magots",
      note: "Enjoy the famous cafe!",
    },
    {
      id: 3,
      date: "October 10, 2026",
      time: "9:00 AM",
      place: "Notre-Dame Cathedral",
      note: "Gothic architecture",
    },
  ]);

  // grab just the unique dates so we can still show things grouped by day
  // Set drops the duplicates, then the ... turns it back into an array
  const dates = [...new Set(entries.map((entry) => entry.date))];

  // takes an entry out of the list by filtering it out
  // never change the array directly, always use the setter or it wont re-render
  function handleRemove(id: number) {
    setEntries(entries.filter((entry) => entry.id !== id));
  }

  // adds a new entry onto the end of the list
  // the ... copies the old entries, then we stick the new one after it
  function handleAdd(date: string, time: string, place: string, note: string) {
    const newEntry = {
      id: Date.now(),
      date: date,
      time: time,
      place: place,
      note: note,
    };

    setEntries([...entries, newEntry]);
  }

  return (
    // everything has to be inside one section and name matches the folder
    <section className="itinerary">
      <h2>Itinerary</h2>

      {/* showing and changing the shared trip, this is T.3 */}
      <p>Current trip: {selectedTrip}</p>
      <button onClick={() => setSelectedTrip("Paris Trip")}>Paris</button>
      <button onClick={() => setSelectedTrip("Iceland Trip")}>Iceland</button>

      {/* passing the add function down so the form can use it */}
      <AddEntryForm onAdd={handleAdd} />

      {/* one block per date */}
      {dates.map((date) => (
        <article key={date}>
          <h3>{date}</h3>

          <ul>
            {/* only show the entries that belong to this date */}
            {entries
              .filter((entry) => entry.date === date)
              .map((entry) => (
                <li key={entry.id}>
                  <time>{entry.time}</time>
                  <h4>{entry.place}</h4>
                  <p>{entry.note}</p>

                  {/* arrow function so it only runs on click, not on render */}
                  <button onClick={() => handleRemove(entry.id)}>Remove</button>
                </li>
              ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

// need this so App.tsx can pull the component in
export default Itinerary;
