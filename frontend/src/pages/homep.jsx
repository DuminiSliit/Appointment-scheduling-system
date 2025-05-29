import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf'; // Make sure you import jsPDF
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


export default function Homep() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");

  
// Fetch doctors from the backend
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/doctors");
      const data = await res.json();
      setAppointments(data);
      setFilter(data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    }
  };

  fetchDoctors();
}, []);

// Filter doctors based on search query  
  useEffect(() => {
    if (query.trim() === "") {
      setFilter(appointments); // Reset filter when query is empty
    } else {
      const filteredData = appointments.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, appointments]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Doctor Name", "Date", "Time"]],
      body: filter.map((doctor) => [
        doctor.doctorName,
        doctor.Docdate,
        doctor.Time,
      ]),
      theme: "grid",
      headStyles: { fillColor: [0, 0, 255] },
    });
    doc.save("doctors.pdf");
  };

  

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative bg-blue-900 text-white h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/doctors-day-handsome-brunette-cute-guy-medical-gown-thinking-wearing-glasses.jpg?alt=media&token=bf41b8f3-b7ce-411b-a8f0-c34cf42a5c7c')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">Your Health, Our Priority</h1>
          <p className="text-xl mb-6">Book an appointment with the best healthcare professionals</p>
          <a href="/add" className="bg-blue-600 text-white py-2 px-6 rounded-full text-xl transition duration-300 hover:bg-blue-500">
            Book Appointment
          </a>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section id="appointments" className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-8">Available Doctors</h2>
          <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="Search by Doctor's Name"
              className="w-72 h-10 bg-white rounded-full border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={generatePDF}
              className="bg-blue-600 text-white ml-6 py-2 px-4 rounded-2xl"
            >
              Download PDF
            </button>
          </div>
          <div className='overflow-x-auto scrollbar-none lg:h-[400px]'>
          {/* Display Filtered Results or "No Data" */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filter.length > 0 ? (
              filter.map((doctor) => (
                <Link to={`/doctor/${doctor._id}`} key={doctor._id}> {/* Navigate to Doctor Detail Page */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                  <h3 className="text-2xl font-semibold mb-4">{doctor.doctorName}</h3>
                  <p className="text-gray-700 mb-4">{doctor.Docdate}</p>
                  <p className="text-gray-600 mb-6">{doctor.Time}</p>
                </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full">
                <h3>No doctors found with that name.</h3>
              </div>
            )}
          </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
