import React from "react";

export default function InclusionsExclusionsSection({ inclusions, exclusions, setInclusions, setExclusions }) {
  return (
    <section className="bg-white p-4 rounded shadow mb-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-1">Inclusions</h3>
          <textarea
            className="w-full p-2 border rounded h-24"
            value={inclusions.join("\n")}
            onChange={(e) => setInclusions(e.target.value.split("\n"))}
          />
        </div>
        <div>
          <h3 className="font-semibold mb-1">Exclusions</h3>
          <textarea
            className="w-full p-2 border rounded h-24"
            value={exclusions.join("\n")}
            onChange={(e) => setExclusions(e.target.value.split("\n"))}
          />
        </div>
      </div>
    </section>
  );
}
