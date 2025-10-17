import React, { useState } from "react";

export default function DaysSection({ days, addDay, removeDay, updateDay }) {
  const [imagePreviews, setImagePreviews] = useState({});

  const handleImageUpload = (e, i) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        setImagePreviews((prev) => ({ ...prev, [i]: previewUrl }));
        updateDay(i, "image", previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Daily Itinerary</h2>
        <button
          onClick={addDay}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Day
        </button>
      </div>

      {/* Each Day */}
      <div className="relative pl-6 space-y-10">
        {days.map((day, i) => (
          <div key={i} className="relative">

            {/* Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              {/* Top Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left Column: Day + Image */}
                <div className="flex items-center gap-4">
                  {/* Day Label */}
                  <div className=" py-4 rounded-xl text-sm font-semibold text-center w-14">
                    Day {day.dayNumber || i + 1}
                  </div>

                  {/* Image Upload + Preview */}
                  <div className="relative">
                    {(imagePreviews[i] || day.image) ? (
                      <img
                        src={imagePreviews[i] || day.image}
                        alt="day"
                        className="w-28 h-28 object-cover  shadow-md"
                      />
                    ) : (
                      <div className="w-28 h-28 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, i)}
                      className="absolute bottom-1 left-1 text-[10px] opacity-70 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Right Column: Date + City */}
                <div className="flex flex-col items-start md:items-end">
                  <input
                    type="date"
                    className="border rounded-md p-2 text-sm mb-2"
                    value={day.date || ""}
                    onChange={(e) => updateDay(i, "date", e.target.value)}
                  />
                  <input
                    type="text"
                    className="border rounded-md p-2 text-sm w-48"
                    placeholder="City / Title"
                    value={day.city || ""}
                    onChange={(e) => updateDay(i, "city", e.target.value)}
                  />
                </div>
              </div>

              {/* Divider */}
              <hr className="my-4" />

              {/* Activity Inputs */}
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                {["morning", "afternoon", "evening"].map((time) => (
                  <div key={time} className="flex flex-col">
                    <label className="font-semibold text-gray-700 mb-1 capitalize">
                      {time}
                    </label>
                    <textarea
                      rows="3"
                      className="border rounded-md p-2 resize-none"
                      placeholder={`Describe ${time} activities`}
                      value={day.activities?.[time] || ""}
                      onChange={(e) =>
                        updateDay(i, "activities", {
                          ...day.activities,
                          [time]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Transport */}
              <div className="mt-4">
                <input
                  type="text"
                  className="border rounded-md p-2 w-full text-sm"
                  placeholder="Transport / Transfers / Notes"
                  value={day.transport || ""}
                  onChange={(e) => updateDay(i, "transport", e.target.value)}
                />
              </div>

              {/* Remove Button */}
              {days.length > 1 && (
                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => removeDay(i)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove Day
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
