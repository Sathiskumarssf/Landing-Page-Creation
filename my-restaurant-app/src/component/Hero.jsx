import { useState } from 'react';
import Contact from './Contects';
import Menu from './Menu';

export default function Hero() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(''); 
 
  const validate = () => {
    const newErrors = {};

    if (!reservation.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!reservation.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(reservation.email)) {
      newErrors.email = 'Invalid email address';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!reservation.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(reservation.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }

    if (!reservation.date.trim()) {
      newErrors.date = 'Date is required';
    }

    if (!reservation.time.trim()) {
      newErrors.time = 'Time is required';
    }

    if (reservation.guests < 1) {
      newErrors.guests = 'Number of guests must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
  
    try {
      const response = await fetch("landing-page-creation.vercel.app/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservation),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Reservation Successful:", data);
        setSuccessMessage("Your reservation was successful! Thank you.");
        
        // Reset form data after submission
        setReservation({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: 1,
        });
  
      } else {
        const errorData = await response.json();
        console.error("Error submitting reservation:", errorData);
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  };
  

  return (
    <div>
      {/* Home Section */}
      <div id="home" className="bg-cover bg-center h-screen flex items-center justify-center" style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvZFZrbCYl1l2GEiIIP3eB-hPjHXQqw77hw&s')`,
      }}>
        <div className="text-white text-center px-4 sm:px-8 md:px-12 lg:px-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Welcome to Our Restaurant</h1>
          <p className="text-lg sm:text-xl mt-4">Experience the finest cuisine in town</p>
          <button
            className="mt-6 bg-blue-500  text-sm md:text-xl lg:text-4xl  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsFormVisible(true)} // Show form when button is clicked
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Reservation Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[90%] md:w-[60%] lg:w-[40%] relative mx-4">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </button>
        
            <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold mb-4">Reserve Your Table</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={reservation.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border text-sm md:text-xl lg:text-xl text-gray-800 border-gray-300 rounded"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={reservation.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border text-sm md:text-xl lg:text-xl text-gray-800 border-gray-300 rounded"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm md:text-xl lg:text-xl font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={reservation.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border text-sm md:text-xl lg:text-xl text-gray-800 border-gray-300 rounded"
                  required
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={reservation.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border text-sm md:text-xl lg:text-xl text-gray-800 border-gray-300 rounded"
                  required
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={reservation.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border text-sm md:text-xl lg:text-xl text-gray-800 border-gray-300 rounded"
                  required
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={reservation.guests}
                  onChange={handleInputChange}
                  className="w-full p-2 border text-sm md:text-xl lg:text-xl text-gray-800 border-gray-300 rounded"
                  min="1"
                  required
                />
                {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white text-lg font-semibold py-2 px-4 rounded hover:bg-blue-700"
              >
                Submit Reservation
              </button>
            </form>
            {successMessage && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-4">
            <div className="mt-4 text-green-500 text-sm">{successMessage}</div>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => setSuccessMessage('')} // Close success message
            >
              Close
            </button>
          </div>
        </div>
      )}
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div id="menu" className="text-center bg-slate-500 py-8">
        <Menu/>
      </div>

      <div id='contect'>
          <Contact/>
      </div>
    </div>
  );
}
