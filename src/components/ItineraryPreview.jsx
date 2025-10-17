import React from "react";
import logo from "../assets/goTrip_logo.svg";

import flight from "../assets/material-symbols_flight.svg";
import building from "../assets/building.svg";
import visa from "../assets/visa-purple-1.svg";
import taxi from "../assets/bxs_taxi.svg";
import vector from "../assets/Vector.svg";

import FlightSummary from "./PDF_Preview/FlightSummary.jsx"

const flights = [
  {
    date: "Thu 10 Jan'24",
    airline: "Air India",
    flightNumber: "AX-123",
    from: "Delhi",
    fromCode: "DEL",
    to: "Singapore",
    toCode: "SIN",
  },
  {
    date: "Fri 11 Jan'24",
    airline: "Singapore Airlines",
    flightNumber: "SQ-403",
    from: "Singapore",
    fromCode: "SIN",
    to: "Bali",
    toCode: "DPS",
  },
];
// fallback contents taken from your pasted data if props not provided:
const importantNotes = [
  { point: "Airlines Standard Policy", detail: "In case of visa rejection, visa fees or any other non cancellable component cannot be reimbursed at any cost." },
  { point: "Flight/Hotel Cancellation", detail: "In case of visa rejection, visa fees or any other non cancellable component cannot be reimbursed at any cost." },
  { point: "Trip Insurance", detail: "In case of visa rejection, visa fees or any other non cancellable component cannot be reimbursed at any cost." },
  { point: "Hotel Check-In & Check Out", detail: "In case of visa rejection, visa fees or any other non cancellable component cannot be reimbursed at any cost." },
  { point: "Visa Rejection", detail: "In case of visa rejection, visa fees or any other non cancellable component cannot be reimbursed at any cost." }
];
const scopeOfService = [
  { service: "Flight tickets and hotel vouchers", detail: "Delivered 3 days post full payment" },
  { service: "Web Check-In", detail: "Boarding pass delivery via Email/WhatsApp" },
  { service: "Support", detail: "Chat support – Response time: 4 hours" },
  { service: "Cancellation Support", detail: "Provided" },
  { service: "Trip Support", detail: "Response time: 5 minutes" }
];
const inclusionSummary = [
  { category: "Flight", count: 2, details: "All flights mentioned", status: "Awaiting Confirmation" },
  { category: "Tourist Tax", count: 2, details: "Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)", status: "Awaiting Confirmation" },
  { category: "Hotel", count: 2, details: "Airport to Hotel - Hotel to Attractions - Day trips if any", status: "Included" }
];
// Activity table fallback: many repeated rows in your paste; keep a compact default
const activitiesTable = [
  { city: "Rio de Janeiro", activity: "Sydney Harbour Cruise & Taronga Zoo", type: "Nature/Sightseeing", time: "2-3 Hours" },
  { city: "Rio de Janeiro", activity: "Sydney Harbour Cruise & Taronga Zoo", type: "Airlines Standard", time: "2-3 Hours" },
  // ... you can pass a longer array via props; fallback includes a few rows
];


export default function ItineraryPreview({ pdfRef, overview, days, hotels, payments, inclusions, exclusions, format }) {
  return (
    <div ref={pdfRef} className="bg-white p-6 mt-10 rounded shadow max-w-3xl mx-auto">
      <div className="pdf-section">
        <img src={logo} alt="goTrip-logo" className="m-auto text-center w-1/4" />
        <div className="m-auto text-auto text-white border-1 bg-[#7c3aed] bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] rounded-2xl py-10 overview">
          <h1 className="lg:text-5xl text-2xl font-medium mb-2 text-center ">Hi {overview.userName}!</h1>
          <h2 className="lg:text-5xl text-xl font-semibold mb-2 text-center">{overview.title}</h2>
          <p className="lg:text-4xl text-xl font-semibold mb-2 text-center">
            {overview.totalDays} Days
          </p>
          <ul type="none" className="flex justify-between m-auto px-2/3 w-1/3  p-5">
            <li><img src={flight} alt="Flight"/></li>
            <li><img src={building} alt="Building" /></li>
            <li><img src={vector} alt="Vector" /></li>
            <li><img src={taxi} alt="Taxi" /></li>
            <li><img src={visa} alt="Visa" /></li>
          </ul>
          
        </div>
      
        <div className="m-auto text-auto text-black border-[#541C9C] border rounded-4xl py-5 px-7 mt-8 font-[Roboto]">
          <ul type="none" className="flex flex-wrap justify-between">
            <li className="block">
              <label className="block font-bold text-base ">Departure from:</label>
              <p className="font-normal">{overview.departure}</p>
            </li>
            <li className="block">
              <label className="block font-bold text-base">Departure:</label>
              <p className="font-normal">{overview.startDate}</p>
            </li>
            <li className="block">
              <label className="block font-bold text-base">Arrival:</label>
              <p className="font-normal">{overview.endDate}</p>
            </li>
            <li className="block">
              <label className="block font-bold text-base">Destination:</label>
              <p className="font-normal">{overview.arrival}</p>
            </li>
            <li className="block">
              <label className="block font-bold text-base">No. of Travellers:</label>
              <p className="font-normal">{overview.travelers}</p>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pdf-section">
        <div className="space-y-8 mt-8">
          {days.map((d, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* Left vertical day badge */}
              <div className="flex flex-col items-center w-16 mt-10">
                <div
                  className="bg-[#321E5D] text-white text-xs font-semibold px-1 rounded-full text-center rotate-[-90deg] w-24"
                >
                  <span  style={{ writingMode: "vertical-lr", transform: "rotate(270deg)" }}>Day {d.dayNumber}</span>
                </div>
              </div>

              {/* Middle: timeline and image */}
              <div className="flex flex-col items-center relative">
                {/* vertical line */}
                {i !== days.length - 1 && (
                  <div className="absolute top-14 bottom-0 w-[2px] bg-gray-300"></div>
                )}

                {/* image circle */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md z-10 bg-gray-100">
                  {d.image ? (
                    <img
                      src={d.image}
                      alt={d.city || `Day ${d.dayNumber}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                {/*Date,city & activity */}    
                <h3 className="text-sm font-semibold text-gray-600">
                  {d.date ? format(new Date(d.date), "d MMMM") : ""}
                </h3>
                <h2 className="text-base font-bold text-gray-800 mb-2">
                  {d.city || d.title || "Untitled"}
                </h2>
              </div>

              {/* Right content */}
              <div className="flex-1 bg-white shadow-sm border border-gray-200 rounded-lg p-4">
                <div className="space-y-2 text-sm text-gray-700 ">
                  <div>
                    <span className="font-semibold text-[#0b1e63]">Morning: </span>
                    {d.activities.morning || "—"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#0b1e63]">Afternoon: </span>
                    {d.activities.afternoon || "—"}
                  </div>
                  <div>
                    <span className="font-semibold text-[#0b1e63]">Evening: </span>
                    {d.activities.evening || "—"}
                  </div>
                  {d.transport && (
                    <div>
                      <span className="font-semibold text-[#0b1e63]">Transport: </span>
                      {d.transport}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      <hr className="my-6 border-[#d1d5db]" />
        <FlightSummary flights={flights} />
      </div>
      
      <hr className="my-6 border-[#d1d5db]" />
  
      <div className="pdf-section">
        {hotels.length > 0 && (
          <div className="my-10 font-[Roboto]">
            <h2 className="font-bold text-2xl">Hotel <span className="text-[#541C9C]">Bookings</span></h2>
            <div className="text-sm mt-4">
              <table className="w-full border-collapse md:rounded-4xl rounded-xl overflow-hidden border-spacing-y-6 shadow">
                <thead>
                  <tr className="bg-[#321E5D] text-white text-sm p-1 ">
                    <th className="lg:rounded-t-4xl rounded-t-lg border-inherit border-l-2 py-1">City</th>
                    <th className="lg:rounded-t-4xl rounded-t-lg border-l-4 py-2 ">CheckIn</th>
                    <th className="lg:rounded-t-4xl rounded-t-lg border-l-4 py-2">CheckOut</th>
                    <th className="lg:rounded-t-4xl rounded-t-lg border-l-4 py-2">Nights</th>
                    <th className="lg:rounded-t-4xl rounded-t-lg border-l-4 py-2">Hotel Name</th>
                  </tr>
                </thead>
                
                <tbody>
                  {hotels.map((h, i) => (
                    <tr className="bg-[f9eeff] text-center font-light py-1 text-sm" key={i}>
                      <td className="py-1 ">{h.city}</td>
                      <td  className="py-1 ">{h.checkIn}</td>
                      <td  className="py-1  ">{h.checkOut}</td>
                      <td  className="py-1 ">{h.nights}</td>
                      <td  className="py-1">{h.hotelName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        )}
      </div>
     
      <hr className="my-6 border-[#d1d5db]" />

      <div className="pdf-section">
        {/* Important Notes */}
        <section className="my-10 font-[Roboto]">
          <h2 className="font-bold text-2xl">Important <span className="text-[#541C9C]">Notes</span></h2>
          <table className="mt-4 w-full border-collapse rounded-4xl overflow-hidden border-spacing-y-6 shadow">
            <thead>
              <tr className="bg-[#321E5D] text-white text-center text-sm">
                <th className="md:rounded-t-4xl rounded-t-lg border-l-4 py-2">Point</th>
                <th className="md:rounded-t-4xl rounded-t-lg border-l-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {importantNotes.map((n, idx) => (
                <tr key={idx} className="bg-[f9eeff] text-center font-light py-1 text-sm">
                  <td className="px-3 py-2 ">{n.point}</td>
                  <td className="px-3 py-2">{n.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      
      
        <hr className="my-6 border-[#d1d5db]" />

        {/* Scope of Service */}
        <section className="my-10 font-[Roboto]">
          <h2 className="font-bold text-2xl">Scope of <span className="text-[#541C9C]">Service</span></h2>
          
          <table className="mt-4 w-full border-collapse rounded-4xl overflow-hidden border-spacing-y-6 shadow">
            <thead>
              <tr className="bg-[#321E5D] text-white text-center text-sm">
                <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Service</th>
                <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {scopeOfService.map((s, idx) => (
                <tr key={idx} className="bg-[f9eeff] text-center font-light py-1 text-sm">
                  <td className="p-2 ">{s.service}</td>
                  <td className="p-2">{s.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
     

      <hr className="my-6 border-[#d1d5db]" />

      <div className="pdf-section">
      {/* Inclusion Summary */}
      <section className="my-10 font-[Roboto]">
        <h2 className="font-bold text-2xl">Inclusion <span className="text-[#541C9C]">Summary</span></h2>
         <table className="mt-4 w-full border-collapse rounded-4xl overflow-hidden border-spacing-y-6 shadow">
          <thead>
            <tr className="bg-[#321E5D] text-white text-center text-sm">
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2 px-2">Category</th>
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2 px-2">Count</th>
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Details</th>
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2 px-2">Status / Comments</th>
            </tr>
          </thead>
          <tbody>
            {inclusionSummary.map((inc, idx) => (
              <tr key={idx} className="bg-[f9eeff] text-center font-light py-1 text-sm">
                <td className="p-2">{inc.category}</td>
                <td className="p-2">{inc.count}</td>
                <td className="p-2">{inc.details}</td>
                <td className="p-2">{inc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-gray-500 mt-3">
          <b>Transfer Policy(Refundable Upon Claim)</b><br />
          If any transfer is delayed beyond 15 minutes, customers may book an app-based or  radio taxi and claim a refund for that specific leg.
        </p>
      </section>

      <hr className="my-6 border-[#d1d5db]" />

      {/* Activity Table */}
      <section className="my-10 font-[Roboto]">
        <h2 className="font-bold text-2xl">Activity <span className="text-[#541C9C]">Table</span></h2>
        <table className="mt-4 w-full border-collapse rounded-4xl overflow-hidden border-spacing-y-6 shadow">
          <thead>
            <tr className="bg-[#321E5D] text-white text-center text-sm">
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">City</th>
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Activity</th>
              <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Type</th>
              <th className="md:rounded-t-4xl rounded-t-lg  border-l-2 py-2 px-2">Time Required</th>
            </tr>
          </thead>
          <tbody>
            {activitiesTable.map((a, idx) => (
              <tr key={idx}  className="bg-[f9eeff] text-center font-light py-1 text-sm">
                <td className="p-2">{a.city}</td>
                <td className="p-2">{a.activity}</td>
                <td className="p-2">{a.type}</td>
                <td className="p-2">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    
      {/* Terms & Policies */}
      <section  className="my-10 font-[Roboto]">
       <h2 className="font-bold text-2xl">Terms and <span className="text-[#541C9C]">Conditions </span></h2>
       <p className="font-extrabold underline text-[#2F80ED] mt-3"><a href="#" target="" rel="">View all terms and conditions</a></p>
      </section>
      </div>

      
       <div className="pdf-section">
      {/* Payment Plan + Visa */}
      <section className="my-10 font-[Roboto]">
        <h2 className="font-bold text-2xl">Payment <span className="text-[#541C9C]">Plan</span></h2>
        <div className="">
          <div className="mt-5">
            <div className="flex items-center border border-[#541C9C] rounded-md overflow-hidden shadow-sm">
              <div className="bg-[#F9EEFF]  text-[#0b1e63] font-semibold px-4 py-2 w-40 text-center text-sm">
                Total Amount
              </div>
              <div className="text-sm text-center text-[#000]">
                <span><strong>9,00,000 </strong></span>
                <span> For 3 pax (inclusive of GST)</span>
              </div>
            </div>
            <div className="my-5 flex items-center border border-[#541C9C] rounded-md overflow-hidden shadow-sm">
              <div className="bg-[#F9EEFF]  text-[#0b1e63] font-semibold px-4 py-2 w-40 text-center text-sm">
                TCS
              </div>
              <div className="text-sm text-center text-[#000]">
                <span><strong>Not Collected </strong></span>
              </div>
            </div>
          </div>
          {hotels.length > 0 && (
            <table className="mt-4 w-full border-collapse rounded-4xl overflow-hidden border-spacing-y-6 shadow">
              <thead>
                <tr className="bg-[#321E5D] text-white text-center text-sm">
                  <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Installment</th>
                  <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Amount</th>
                  <th className="md:rounded-t-4xl rounded-t-lg border-l-2 py-2">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p,i) => (
                  <tr key={i}  className="bg-[f9eeff] text-center font-light py-1 text-sm">
                    <td className="py-2">Installment {p.installment}</td>
                    <td className="py-2">{p.amount ? `₹${p.amount}` : "—"}</td>
                    <td className="py-2"> {p.dueDate ? format(new Date(p.dueDate), "MMM d, yyyy") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
        </div>

        <section className="my-10 font-[Roboto]">
          <h2 className="font-bold text-2xl">Visa <span className="text-[#541C9C]">Details</span></h2>
          <div className="m-auto text-auto text-black border-[#541C9C] border rounded-4xl py-5 px-7 mt-4 font-[Roboto]">
            <ul type="none" className="flex flex-wrap justify-between">
              <li className="block">
                <label className="block font-bold text-base ">Visa Type:</label>
                <p className="font-normal">123456789</p>
              </li>
              <li className="block">
                <label className="block font-bold text-base">Validity:</label>
                <p className="font-normal">123456789</p>
              </li>
              <li className="block">
                <label className="block font-bold text-base">Processing Date</label>
                <p className="font-normal">123456789</p>
              </li>
            </ul>
          </div>
        </section>
      </section>

      <hr className="my-6 border-[#d1d5db]" />

      <div className="mt-6 mx-auto text-center">
        <h4 className="uppercase text-6xl text-[#321E5D]">Plan . Go!</h4>
        <button className="w-1/3 rounded-4xl bg-[#541C9C] py-3 px-15 font-extrabold text-white mt-6">Book Now</button>
      </div>

      <div className="mt-6 text-xs text-gray-500">Generated by Itinerary Builder — Confidential.</div>
    </div>
    </div>
  );
}


