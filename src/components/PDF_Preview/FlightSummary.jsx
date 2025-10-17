import React from "react";

export default function FlightSummary({ flights }) {
  return (
    <section className="mt-8">
      <h2 className="font-bold text-2xl mb-2">Flight <span className="text-violet-600">Summary</span></h2>

      <div className="space-y-2 mt-4">
        {flights.map((f, i) => (
          <div
            key={i}
            className="flex items-center border border-[#541C9C] rounded-md overflow-hidden shadow-sm"
          >
            {/* Date section with arrow shape */}
            <div className="relative bg-gray-100 text-[#0b1e63] font-semibold px-4 py-2 w-40 text-center text-sm">
              {f.date}
              {/* <div
                className="absolute top-0 right-0 w-0 h-0 border-t-[22px] border-t-transparent border-b-[22px] border-b-transparent border-l-[18px] border-l-white"
              ></div> */}
            </div>

            {/* Flight details */}
            <div className="flex-1 px-4 py-2 text-sm text-gray-700">
              <span className="font-semibold text-[#0b1e63]">
                Fly {f.airline} ({f.flightNumber})
              </span>{" "}
              From <span className="font-medium">{f.from}</span> ({f.fromCode}) To{" "}
              <span className="font-medium">{f.to}</span> ({f.toCode}).
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-500 mt-3">
        Note: All flights include meals, seat choice (excluding XL), and 20kg/25kg checked baggage.
      </p>
    </section>
  );
}
