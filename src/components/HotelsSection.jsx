import React from "react";

export default function HotelsSection({ hotels, addHotel, updateHotel }) {
  return (
    <section className="bg-white p-4 rounded shadow mb-6">
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold">Hotels</h2>
        <button onClick={addHotel} className="bg-green-600 text-white px-3 py-1 rounded">+ Add Hotel</button>
      </div>

      {hotels.map((h, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-2 mb-2">
          <div>
            <label className="block font-medium">City</label>
            <input className="p-2 border rounded w-2/3" placeholder="City" value={h.city} onChange={(e) => updateHotel(i, "city", e.target.value)} />
          </div>
          <div>
            <label className="block font-medium">Hotel Name</label>
            <input className="p-2 border rounded w-2/3" placeholder="Hotel Name" value={h.hotelName} onChange={(e) => updateHotel(i, "hotelName", e.target.value)} />
          </div>
          <div>
            <label className="block font-medium">CheckIn</label>
            <input type="date" className="p-2 border rounded w-2/3" value={h.checkIn} onChange={(e) => updateHotel(i, "checkIn", e.target.value)} />
          </div>
          <div>
            <label className="block font-medium">Check Out</label>
            <input type="date" className="p-2 border rounded w-2/3" value={h.checkOut} onChange={(e) => updateHotel(i, "checkOut", e.target.value)} />
          </div>
          <div>
            <label className="block font-medium">Nights</label>
            <input type="number" className="p-2 border rounded w-2/3" value={h.nights} onChange={(e) => updateHotel(i, "nights", Number(e.target.value) || 0)} />
          </div>
        </div>
      ))}
    </section>
  );
}
