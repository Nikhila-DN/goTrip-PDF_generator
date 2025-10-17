import React from "react";

export default function OverviewSection({ overview, updateOverview }) {
  return (
    <section className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">Trip Overview</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="block font-medium">User Name</label>
          <input
            className="p-2 border rounded w-2/3"
            placeholder="User Name"
            value={overview.userName}
            onChange={(e) => updateOverview("userName", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Trip Title</label>
          <input
            className="p-2 border rounded w-2/3"
            placeholder="Trip Title"
            value={overview.title}
            onChange={(e) => updateOverview("title", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Departure from</label>
          <input
            className="p-2 border rounded w-2/3"
            placeholder="Departure"
            value={overview.departure}
            onChange={(e) => updateOverview("departure", e.target.value)}
          />
        </div>
        
        <div>
          <label className="block font-medium">Destination</label>
          <input
            className="p-2 border rounded w-2/3"
            placeholder="Arrival"
            value={overview.arrival}
            onChange={(e) => updateOverview("arrival", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Departure</label>
          <input
            type="date"
            className="p-2 border rounded w-2/3"
            value={overview.startDate}
            onChange={(e) => updateOverview("startDate", e.target.value)}
          />
        </div>
       
        <div>
          <label className="block font-medium">Arrival</label>
          <input
            type="date"
            className="p-2 border rounded w-2/3"
            value={overview.endDate}
            onChange={(e) => updateOverview("endDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">No. of Travellers</label>
          <input
            type="number"
            className="p-2 border rounded w-2/3"
            placeholder="Travelers"
            value={overview.travelers}
            onChange={(e) => updateOverview("travelers", Number(e.target.value) || 0)}
          />
        </div>
        
      </div>
    </section>
  );
}
