import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ManageEmp() {
  const [Info, setInfo] = useState([]);
  const [DId, setformId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchinfo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/gappointments`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setInfo(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchinfo();
  }, []);

  

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/ppointments/${DId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInfo((prev) => prev.filter((course) => course._id !== DId));
        alert("Deleted");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...Info]);
    } else {
      const filteredData = Info.filter(
        (course) =>
          course.name &&
          course.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Info]);

  return (
    <div className="h-[800px] relative bg-[url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/nnkkkkkkkkkkkkkkkkkkkk.PNG?alt=media&token=0cfb779d-d6b8-4245-ac44-969868a12c5b')] bg-cover bg-center">
    <div className="items-center justify-center flex">
      <div className="items-center">
        {/* Add Appointment Button */}
        <div className="w-full text-center mt-8 mb-6">
          <h1 className="text-2xl font-serif text-white shadow-xl shadow-blue-50">
            My Appointment
          </h1>
        </div>
  
        <div className="lg:w-[1200px] mt-8 rounded-3xl shadow-xl  overflow-hidden">
        <div className="overflow-x-auto scrollbar-none lg:h-[600px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filter && filter.length > 0 ? (
              filter.map((course) => (
                <div
                  key={course._id}
                  className="bg-blue-500 bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <h3 className="text-xl text-white font-semibold ">
                    Patient: {course.patientName}
                  </h3>
                  <p className="text-white mt-2">
                    <strong>Doctor:</strong> {course.doctorName}
                  </p>
                  <p className="text-white mt-2">
                    <strong>Appointment Date:</strong> {course.appointmentDate}
                  </p>
                  <p className="text-white mt-2">
                    <strong>Appointment Time:</strong> {course.appointmentTime}
                  </p>
  
                  <div className="flex justify-between mt-4">
                    <Link to={`/updatee/${course._id}`}>
                      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setformId(course._id);
                        handleDeleteUser();
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No records found
              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
