export default function Menu() {
    const dishes = [
      { name: 'Spaghetti Carbonara', price: '$12', description: 'Classic Italian pasta dish' },
      { name: 'Margherita Pizza', price: '$15', description: 'Fresh basil, mozzarella, and tomato sauce' },
      { name: 'Caesar Salad', price: '$10', description: 'Crispy romaine with creamy Caesar dressing' },
    ];
  
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">{dish.name}</h3>
              <p className="text-gray-700">{dish.description}</p>
              <p className="text-blue-500 font-bold mt-2">{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  