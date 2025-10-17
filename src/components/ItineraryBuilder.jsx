import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { format } from "date-fns";

import Header from "./Header";

import OverviewSection from "./OverviewSection";
import DaysSection from "./DaysSection";
import HotelsSection from "./HotelsSection";
import PaymentSection from "./PaymentSection";
import InclusionsExclusionsSection from "./InclusionsExclusionsSection";
import ItineraryPreview from "./ItineraryPreview";

import { createEmptyDay } from "./utils/helpers";

export default function ItineraryBuilder() {
  const [overview, setOverview] = useState({
    userName: "Rahul",
    title: "My Amazing Trip",
    totalDays: 1,
    travelers: 2,
    departure: "City A",
    arrival: "City B",
    startDate: "",
    endDate: "",
  });

  const [days, setDays] = useState([createEmptyDay(1)]);
  const [hotels, setHotels] = useState([
    { hotelName: "Sample Hotel", city: "City B", checkIn: "", checkOut: "", nights: 1 },
  ]);
  const [payments, setPayments] = useState([{ installment: 1, amount: 0, dueDate: "" }]);
  const [inclusions, setInclusions] = useState(["Accommodation", "Breakfast"]);
  const [exclusions, setExclusions] = useState(["Airfare", "Personal expenses"]);

  const pdfRef = useRef(null);

  const updateOverview = (key, value) => setOverview((o) => ({ ...o, [key]: value }));

  const addDay = () => {
    setDays((prev) => {
      const next = [...prev, createEmptyDay(prev.length + 1)];
      setOverview((o) => ({ ...o, totalDays: next.length }));
      return next;
    });
  };

  const removeDay = (index) => {
    setDays((prev) => {
      if (prev.length === 1) return prev;
      const next = prev
        .filter((_, i) => i !== index)
        .map((d, i) => ({ ...d, dayNumber: i + 1 }));
      setOverview((o) => ({ ...o, totalDays: next.length }));
      return next;
    });
  };

  const updateDay = (i, k, v) => setDays((d) => d.map((day, idx) => (idx === i ? { ...day, [k]: v } : day)));

  const addHotel = () => setHotels((h) => [...h, { hotelName: "", city: "", checkIn: "", checkOut: "", nights: 1 }]);
  const updateHotel = (i, k, v) => setHotels((h) => h.map((item, idx) => (idx === i ? { ...item, [k]: v } : item)));

  const addPayment = () => setPayments((p) => [...p, { installment: p.length + 1, amount: 0, dueDate: "" }]);
  const updatePayment = (i, k, v) => setPayments((p) => p.map((item, idx) => (idx === i ? { ...item, [k]: v } : item)));

    // async function generatePDF() {
    //   if (!pdfRef.current) {
    //       alert("Nothing to export — the preview element is not mounted.");
    //       return;
    //   }

    //   try {
    //       const element = pdfRef.current;

    //       // ✅ Optional: Normalize unsupported color functions like oklch() before rendering
    //       // (This avoids html2canvas parsing errors without touching internal code)
    //       const allElements = element.querySelectorAll("*");
    //       allElements.forEach((el) => {
    //       const style = window.getComputedStyle(el);
    //       ["backgroundColor", "color", "borderColor"].forEach((prop) => {
    //           const val = style[prop];
    //           if (val && val.startsWith("oklch(")) {
    //           el.style[prop] = "rgb(255, 255, 255)"; // replace with plain white
    //           }
    //       });
    //       });

    //       // 🖼️ Create canvas
    //       const canvas = await html2canvas(element, {
    //       scale: 2,
    //       useCORS: true,
    //       windowWidth: element.scrollWidth,
    //       });

    //       const imgData = canvas.toDataURL("image/png");
    //       const pdf = new jsPDF({ unit: "mm", format: "a4" });

    //       const pdfWidth = pdf.internal.pageSize.getWidth();
    //       const pdfHeight = pdf.internal.pageSize.getHeight();
    //       const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    //       let position = 0;
    //       let heightLeft = imgHeight;

    //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    //       heightLeft -= pdfHeight;

    //       while (heightLeft > 0) {
    //       position = heightLeft - imgHeight;
    //       pdf.addPage();
    //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    //       heightLeft -= pdfHeight;
    //       }

    //       const filename =
    //       `${overview.title?.replace(/[^a-z0-9-_ ]/gi, "") || "itinerary"}.pdf`;

    //       pdf.save(filename);
    //   } catch (err) {
    //       console.error("PDF generation error:", err);
    //       alert("Failed to generate PDF — check console for details.");
    //   }
    // }
    async function generatePDF() {
      if (!pdfRef.current) {
        alert("Nothing to export — the preview element is not mounted.");
        return;
      }
    
      try {
        const element = pdfRef.current;

          // ✅ Optional: Normalize unsupported color functions like oklch() before rendering
          // (This avoids html2canvas parsing errors without touching internal code)
          const allElements = element.querySelectorAll("*");
          allElements.forEach((el) => {
            const style = window.getComputedStyle(el);
            ["backgroundColor", "color", "borderColor"].forEach((prop) => {
                const val = style[prop];
                if (val && val.startsWith("oklch(")) {
                el.style[prop] = "rgb(255, 255, 255)"; // replace with plain white
                }
            });
            });

            // 🖼️ Create canvas
            const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            windowWidth: element.scrollWidth,
          });
        const sections = pdfRef.current.querySelectorAll(".pdf-section");
        if (!sections.length) {
          alert("No sections found — please add the class 'pdf-section' to each content block.");
          return;
        }
    
        const pdf = new jsPDF({ unit: "mm", format: "a4" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 20;
    
        let pageNumber = 1;
    
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
    
          // 🖼️ Render each section to canvas separately
          const canvas = await html2canvas(section, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            windowWidth: section.scrollWidth,
          });
    
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pdfWidth - margin * 2;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
          if (i !== 0) pdf.addPage();
    
          // 🏷️ Header
          addHeader(pdf, overview.title || "Travel Itinerary");
    
          // 📄 Add section image content
          pdf.addImage(imgData, "PNG", margin, 25, imgWidth, imgHeight);
    
          // 📜 Footer
          addFooter(pdf, pageNumber, sections.length);
    
          pageNumber++;
        }
    
        const filename =
          `${overview.title?.replace(/[^a-z0-9-_ ]/gi, "") || "itinerary"}.pdf`;
    
        pdf.save(filename);
      } catch (err) {
        console.error("PDF generation error:", err);
        alert("Failed to generate PDF — check console for details.");
      }
    
      // 🔹 Header (Logo + Title)
      // function addHeader(pdf, title) {
      //   const pageWidth = pdf.internal.pageSize.getWidth();
      //   pdf.setFontSize(12);
      //   pdf.setTextColor(40);
    
      //   // 🖼️ Optional: Add a logo on top-left
      //   // pdf.addImage('/logo.png', 'PNG', 15, 5, 20, 10);
    
      //   pdf.text(title, pageWidth / 2, 15, { align: "center" });
      //   pdf.setDrawColor(180);
      //   pdf.line(10, 18, pageWidth - 10, 18);
      // }
      function addHeader(pdf, title) {
        const pageWidth = pdf.internal.pageSize.getWidth();
      
        pdf.setFontSize(12);
        pdf.setTextColor(40);
      
        // 🖼️ Add logo to the top-left
        try {
          pdf.addImage(logo, "PNG", 10, 5, 25, 10); // (image, format, x, y, width, height)
        } catch (e) {
          console.warn("Logo not found or failed to load:", e);
        }
      
        // 🏷️ Add title in center
        pdf.text(title, pageWidth / 2, 15, { align: "center" });
      
        // ➖ Divider line
        pdf.setDrawColor(180);
        pdf.line(10, 18, pageWidth - 10, 18);
      }
      
    
      // 🔹 Footer (Page Number + Branding)
      function addFooter(pdf, page, totalPages) {
        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
    
        pdf.setDrawColor(180);
        pdf.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15);
    
        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text(`Page ${page} of ${totalPages}`, pageWidth - 35, pageHeight - 8);
        pdf.text("© 2025 goTrip.", 15, pageHeight - 8);
      }
    }
    
    
        


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Header />
        <h1 className="text-2xl font-bold mb-4 text-center">Itinerary Builder</h1>

        <OverviewSection overview={overview} updateOverview={updateOverview} />
        <DaysSection days={days} addDay={addDay} removeDay={removeDay} updateDay={updateDay} />
        <HotelsSection hotels={hotels} addHotel={addHotel} updateHotel={updateHotel} />
        <PaymentSection payments={payments} addPayment={addPayment} updatePayment={updatePayment} />
        <InclusionsExclusionsSection
          inclusions={inclusions}
          exclusions={exclusions}
          setInclusions={setInclusions}
          setExclusions={setExclusions}
        />

        <div className="mb-6">
          <button onClick={generatePDF} className="bg-indigo-600 text-white px-4 py-2 rounded">
            Generate PDF
          </button>
        </div>

        <ItineraryPreview
          pdfRef={pdfRef}
          overview={overview}
          days={days}
          hotels={hotels}
          payments={payments}
          inclusions={inclusions}
          exclusions={exclusions}
          format={format}
        />
      </div>
    </div>
  );
}
