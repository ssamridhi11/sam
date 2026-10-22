import { useState, type Dispatch, type SetStateAction } from "react";

interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  uploadedBy: string;
  uploadedOn: string;
  likeCount: number;
  commentCount: number;
  savedCount: number;
}

interface PhotoDraft {
  src: string;
  caption: string;
  uploadedBy: string;
}

interface PhotoFormProps {
  draft: PhotoDraft;
  setDraft: Dispatch<SetStateAction<PhotoDraft>>;
  error: string;
  onAdd: (draft: PhotoDraft) => void;
}

// shared state comes in from App.tsx
interface GalleryProps {
  selectedTrip: string;
  setSelectedTrip: (trip: string) => void;
}

// I.2: form component. State and setter come in as props.
function PhotoForm({ draft, setDraft, error, onAdd }: PhotoFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(draft);
      }}
      className="mb-6 grid gap-3 border-y border-stone-300 py-5 md:grid-cols-3"
    >
      <label className="grid gap-1 text-sm font-medium text-stone-700">
        Image URL
        <input
          type="text"
          value={draft.src}
          onChange={(event) => setDraft((current) => ({ ...current, src: event.target.value }))}
          placeholder="https://example.com/photo.jpg"
          className="min-w-0 rounded border border-stone-300 px-3 py-2 font-normal"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium text-stone-700">
        Caption
        <input
          type="text"
          value={draft.caption}
          onChange={(event) => setDraft((current) => ({ ...current, caption: event.target.value }))}
          placeholder="Add a caption"
          maxLength={120}
          className="min-w-0 rounded border border-stone-300 px-3 py-2 font-normal"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium text-stone-700">
        Your name
        <input
          type="text"
          value={draft.uploadedBy}
          onChange={(event) => setDraft((current) => ({ ...current, uploadedBy: event.target.value }))}
          placeholder="Name"
          maxLength={40}
          className="min-w-0 rounded border border-stone-300 px-3 py-2 font-normal"
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-3">
        <p className="text-sm text-stone-600">{draft.caption.length}/120 characters</p>
        <button
          type="submit"
          className="rounded bg-teal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-900"
        >
          Add photo
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-rose-700 md:col-span-3">
          {error}
        </p>
      )}
    </form>
  );
}

// I.1: feature page
export function SharedPhotoGallery({ selectedTrip, setSelectedTrip }: GalleryProps) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([
    {
      id: "photo1",
      src: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm3QRww5BsQ8OVQZQMrKH7gP_qif9hPqDwGh7NjsjL09t0yRDKooXHflKArajS4eMIRjPV2qavQ3rElyvBY63jJLwVEkXLnpi_PRJCvMO3T6AR-dnMWxuGuH_4QcdQmMfZmHB-jVx9i70EP=s1360-w1360-h1020",
      alt: "Casa Loma in Toronto, Canada",
      caption: "Casa Loma, mansion and garden in midtown Toronto, Canada.",
      uploadedBy: "Sam",
      uploadedOn: "Jun 12",
      likeCount: 6,
      commentCount: 2,
      savedCount: 1,
    },
    {
      id: "photo2",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCF2nVmGZMd5RcjHt7ilQ4smwWCQzgC1EwZEQbqUWOHHWVHvrYbvTOM9Bf&s=10",
      alt: "Toronto skyline from the CN Tower",
      caption: "View from the CN Tower",
      uploadedBy: "Alex",
      uploadedOn: "Jun 13",
      likeCount: 4,
      commentCount: 5,
      savedCount: 0,
    },
  ]);
  const [draft, setDraft] = useState<PhotoDraft>({ src: "", caption: "", uploadedBy: "" });
  const [error, setError] = useState("");

  // I.3: add to the list
  function addPhoto(photoDraft: PhotoDraft) {
    const src = photoDraft.src.trim();
    const caption = photoDraft.caption.trim();
    const uploadedBy = photoDraft.uploadedBy.trim();

    if (!src || !caption || !uploadedBy) {
      setError("Please fill in the image URL, caption, and your name.");
      return;
    }

    setPhotos((current) => [
      {
        id: crypto.randomUUID(),
        src,
        alt: caption,
        caption,
        uploadedBy,
        uploadedOn: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }),
        likeCount: 0,
        commentCount: 0,
        savedCount: 0,
      },
      ...current,
    ]);
    setDraft({ src: "", caption: "", uploadedBy: "" });
    setError("");
  }

  // I.3: remove from the list
  function removePhoto(id: string) {
    setPhotos((current) => current.filter((item) => item.id !== id));
  }

  return (
    <section className="mx-auto my-5 w-[600px] max-w-full px-4">
      <h2 className="mb-1 text-2xl">Trip Photos</h2>

      {/* showing and changing the shared trip, this is T.3 */}
      <p>Current trip: {selectedTrip}</p>
      <button onClick={() => setSelectedTrip("Paris Trip")}>Paris</button>
      <button onClick={() => setSelectedTrip("Iceland Trip")}>Iceland</button>

      <p className="mb-4 text-sm text-stone-600">{photos.length} photos in the gallery</p>

      <PhotoForm draft={draft} setDraft={setDraft} error={error} onAdd={addPhoto} />

      {/* I.2: the form's data updates this part of the page as you type */}
      {(draft.caption || draft.uploadedBy) && (
        <p className="mb-4 rounded bg-stone-100 p-3 text-sm text-stone-700">
          Preview: {draft.caption || "(no caption yet)"} {draft.uploadedBy && `— ${draft.uploadedBy}`}
        </p>
      )}

      {photos.length === 0 && <p className="text-stone-600">No photos yet. Add the first one above.</p>}

      <ul className="m-0 list-none p-0">
        {photos.map((photo) => (
          <li key={photo.id} className="mb-6">
            <figure className="m-0 box-border w-full border border-gray-300 p-2.5">
              <img className="block h-[350px] w-full object-cover" src={photo.src} alt={photo.alt} />
              <figcaption className="px-0.5 py-2">
                <p className="my-1 text-base">{photo.caption}</p>
                <p className="my-1 text-sm text-gray-500">
                  {photo.uploadedBy}, {photo.uploadedOn}
                </p>
                <p className="mt-2 flex gap-4 text-[13px] text-gray-600">
                  <span>{photo.likeCount} likes</span>
                  <span>{photo.commentCount} comments</span>
                  <span>{photo.savedCount} saves</span>
                </p>
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  aria-label={`Remove photo: ${photo.caption}`}
                  className="mt-3 rounded border border-rose-700 px-3 py-1 text-sm text-rose-800 hover:bg-rose-50"
                >
                  Remove photo
                </button>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}