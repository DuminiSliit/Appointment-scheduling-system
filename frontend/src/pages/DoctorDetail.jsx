import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams(); // Access the doctor ID from the URL

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/doctors/${id}`);
        const data = await res.json();
        setDoctor(data);
      } catch (error) {
        console.error('Failed to fetch doctor details', error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (!doctor) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg mb-12">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={doctor.image || "https://via.placeholder.com/150"}
          alt={doctor.doctorName}
          className="w-48 h-48 object-cover rounded-full border-4 border-blue-500"
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{doctor.doctorName}</h1>
          <p className="text-lg text-blue-600 font-medium mb-2">{doctor.designation || "Specialist"}</p>
          <p className="text-gray-700">Available Date: {doctor.Docdate}</p>
          <p className="text-gray-700">Time: {doctor.Time}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
