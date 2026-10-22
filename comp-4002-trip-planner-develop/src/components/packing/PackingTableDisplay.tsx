// shared state comes in from App.tsx
type PackingProps = {
    selectedTrip: string;
    setSelectedTrip: (trip: string) => void;
};

export function PackingTableDisplay({ selectedTrip, setSelectedTrip }: PackingProps) {

    type PackingDetails = {
        id: number;
        packedStatus: boolean;
        itemType: string;
        responsiblePerson: string;
        itemName: string;
        notes: string;
    }

    const packingListItems: PackingDetails[] = [
        {
            id: 1,
            packedStatus: false,
            itemType: "food",
            responsiblePerson: "Nick",  
            itemName: "marshmallows",
            notes: "Get the big ones"
        },
        {
            id: 2,
            packedStatus: false,
            itemType: "first aid",
            responsiblePerson: "Sam",
            itemName: "bandaids",
            notes: "Get bandaids that are also waterproof"
        },
        {
            id: 3,
            packedStatus: false,
            itemType: "tools",
            responsiblePerson: "McCauley",
            itemName: "flashlight",
            notes: "Bring extra batteries"
        }
    ];

    return (
        <section className="packing-list-table">
            <h2>Packing List</h2>

            {/* showing and changing the shared trip, this is T.3 */}
            <p>Current trip: {selectedTrip}</p>
            <button onClick={() => setSelectedTrip("Paris Trip")}>Paris</button>
            <button onClick={() => setSelectedTrip("Iceland Trip")}>Iceland</button>

                <table>
                    <thead>
                        <tr>
                            <th>Packed?</th>
                            <th>Item Type</th>
                            <th>Person Responsible</th>
                            <th>Name</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    {/* List of packing items data initialized and rendered with provided key properties. */}
                    <tbody>
                        {packingListItems.map((packingItem) => (
                            <tr key={packingItem.id}>
                                <td>{packingItem.packedStatus}</td>
                                <td>{packingItem.itemType}</td>
                                <td>{packingItem.responsiblePerson}</td>
                                <td>{packingItem.itemType}</td>
                                <td>{packingItem.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </section>
    );
}
// Component exported for usage in App.tsx
export default PackingTableDisplay;