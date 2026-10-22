import { useState } from "react";

// this is the form for adding a new entry to the itinerary
// it gets the add function passed in as a prop from Itinerary.tsx
type AddEntryFormProps = {
  onAdd: (date: string, time: string, place: string, note: string) => void;
};

function AddEntryForm({ onAdd }: AddEntryFormProps) {
  // keeping track of what the user types in each box
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // runs when the add button gets clicked
  function handleSubmit() {
    // dont let them add something with the important parts missing
    if (date === "" || time === "" || place === "") {
      setError("Please fill in the date, time, and place.");
      return;
    }

    // call the function we got from the parent, it does the actual adding
    onAdd(date, time, place, note);

    // clear the boxes out so theyre ready for the next one
    setDate("");
    setTime("");
    setPlace("");
    setNote("");
    setError("");
  }

  return (
    <div className="add-entry-form">
      <h3>Add an Entry</h3>

      {/* onChange fires every keystroke so state stays in sync with the box */}
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <label htmlFor="time">Time</label>
      <input
        id="time"
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <label htmlFor="place">Place</label>
      <input
        id="place"
        type="text"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />

      <label htmlFor="note">Note</label>
      <input
        id="note"
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {/* only shows up if theres actually an error */}
      {error !== "" && <p className="form-error">{error}</p>}

      <button onClick={handleSubmit}>Add Entry</button>
    </div>
  );
}

export default AddEntryForm;
