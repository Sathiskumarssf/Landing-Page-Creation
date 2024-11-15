export default function Hero() {
    return (
      <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url('/path-to-image.jpg')` }}>
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold">Welcome to Our Restaurant</h1>
          <p className="text-xl mt-4">Experience the finest cuisine in town</p>
          <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Reserve a Table
          </button>
        </div>
      </div>
    );
  }
  