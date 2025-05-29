import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({});
  console.log(formData)
  
  const [publishError, setPublishError] = useState(null);
 

  const { iddd } = useParams();

  const navigate = useNavigate();



  useEffect(() => {
    try {
      const fetchE = async () => {
        const res = await fetch(
          `http://localhost:3000/api/gappointments?upId=${iddd}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedE = data.find(
            (course) => course._id === iddd
          );
          if (selectedE) {
            setFormData(selectedE);
          }
        }
      };
      fetchE();
    } catch (error) {
      console.log(error.message);
    }
  }, [iddd]);



  



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
      const res = await fetch(`http://localhost:3000/api/uappointments/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        
        alert("sucsses ")
        navigate("/mya");
        
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };













  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/dfddlllllllllllllll.PNG?alt=media&token=e69d6d88-9b06-4abd-9205-60c9c8f1d7f4')] bg-cover bg-center">
    <div className="relative bg-blue-500 bg-opacity-20 w-[90%] sm:w-[70%] md:w-[50%] p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 flex flex-col gap-8">
  
      {/* Left Section: Add Appointment Form */}
      <div>
        <div className="w-full bg-blue-500 bg-opacity-30 p-8 rounded-3xl shadow-lg border border-gray-200">
          <div className="flex justify-start w-full">
            <button
              className="text-lg font-medium text-blue-600 hover:text-blue-400 underline"
              onClick={() => navigate("/mya")}
            >
              Back
            </button>
          </div>
  
          {/* Header */}
          <div className="my-7 flex items-center justify-center w-full">
            <h1 className="text-4xl font-bold text-blue-950 uppercase">Add Appointment</h1>
          </div>
  
          {/* Form Section */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
  
            <div className="flex flex-col gap-6 md:flex-row justify-between">
              <div className="flex-1">
                <label htmlFor="patientName" className="text-sm font-medium text-gray-700">Patient Name</label>
                <input
                  className="mt-2 w-full bg-blue-300 shadow-sm p-4 rounded-lg text-gray-700 placeholder-gray-500"
                  type="text"
                  placeholder="Enter Patient Name"
                  required
                  id="patientName"
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  value={formData.patientName}
                />
                <p className="mt-0 text-red-600 h-0 rounded-lg text-center">Name cannot be a number</p>
              </div>
  
              <div className="flex-1">
                <label htmlFor="doctorName" className="text-sm font-medium text-gray-700">Doctor Name</label>
                <select
                  id="doctorName"
                  required
                  className="mt-2 w-full bg-blue-300 shadow-sm p-4 rounded-lg text-gray-700"
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  value={formData.doctorName}
                >
                  <option value="">Select a Doctor</option>
                  <option value="Dr. Emily Davis">Dr. Emily Davis</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                  <option value="Dr. John Smith">Dr. John Smith</option>
                  <option value="Dr. Robert Taylor">Dr. Robert Taylor</option>
                  <option value="Dr. Linda Anderson">Dr. Linda Anderson</option>
                  <option value="Dr. Michael Wilson">Dr. Michael Wilson</option>
                </select>
              </div>
            </div>
  
            <div className="flex flex-col gap-6 md:flex-row justify-between">
              <div className="flex-1">
                <label htmlFor="appointmentDate" className="text-sm font-medium text-gray-700">Appointment Day</label>
                <select
                  id="appointmentDate"
                  required
                  className="mt-2 w-full bg-blue-300 shadow-sm p-4 rounded-lg text-gray-700"
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                  value={formData.appointmentDate}
                >
                  <option value="">Select a Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
  
              <div className="flex-1">
                <label htmlFor="appointmentTime" className="text-sm font-medium text-gray-700">Appointment Time</label>
                <select
                  id="appointmentTime"
                  required
                  className="mt-2 w-full bg-blue-300 shadow-sm p-4 rounded-lg text-gray-700"
                  onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                  value={formData.appointmentTime}
                >
                  <option value="">Select a Time</option>
                  <option value="02:00 PM to 04:00 PM">02:00 PM to 04:00 PM</option>
                  <option value="10:00 AM to 12:00 PM">10:00 AM to 12:00 PM</option>
                  <option value="09:30 AM to 11:30 AM">09:30 AM to 11:30 AM</option>
                  <option value="01:00 PM to 03:00 PM">01:00 PM to 03:00 PM</option>
                  <option value="04:00 PM to 06:00 PM">04:00 PM to 06:00 PM</option>
                  <option value="08:00 AM to 10:00 AM">08:00 AM to 10:00 AM</option>
                </select>
              </div>
            </div>
  
            <button
              type="submit"
              className="mt-6 w-full py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Submit
            </button>
  
            {publishError && (
              <p className="mt-5 text-red-600 text-center text-sm">{publishError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  </div>
  
  

  );
}
