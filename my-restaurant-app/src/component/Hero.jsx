import { useState } from 'react';

export default function Hero() {
  const [isFormVisible, setIsFormVisible] = useState(false); // state to show/hide the form
  const [reservation, setReservation] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
  });

  const dishes = [
    { imageUrl: '/asset/image.png', name: 'Spaghetti Carbonara', price: '$12', description: 'Classic Italian pasta dish' },
    { imageUrl: '/asset/image.png', name: 'Margherita Pizza', price: '$15', description: 'Fresh basil, mozzarella, and tomato sauce' },
    { imageUrl: '/asset/image.png', name: 'Caesar Salad', price: '$10', description: 'Crispy romaine with creamy Caesar dressing' },
    { imageUrl: '/asset/image.png', name: 'Spaghetti Carbonara', price: '$12', description: 'Classic Italian pasta dish' },
    { imageUrl: '/asset/image.png', name: 'Margherita Pizza', price: '$15', description: 'Fresh basil, mozzarella, and tomato sauce' },
    { imageUrl: '/asset/image.png', name: 'Caesar Salad', price: '$10', description: 'Crispy romaine with creamy Caesar dressing' },
  ];

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation Data:', reservation);
    setIsFormVisible(false); // Close form after submission (optional)
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
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsFormVisible(true)} // Show form when button is clicked
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Reservation Form */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-112 relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsFormVisible(false)}
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold mb-4">Reserve Your Table</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={reservation.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={reservation.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={reservation.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={reservation.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  value={reservation.time}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                <input
                  type="number"
                  name="guests"
                  value={reservation.guests}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
              >
                Submit Reservation
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div id="menu" className="text-center bg-slate-500 py-8">
        <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-200">
              <img src={dish.imageUrl} alt={dish.name} className="w-full h-64 object-cover rounded-t-lg mb-4" />
              <h3 className="text-xl font-bold">{dish.name}</h3>
              <p className="text-gray-700">{dish.description}</p>
              <p className="text-blue-500 font-bold mt-2">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
