import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
  canPurchase: boolean;
}

const CarCard: React.FC<CarCardProps> = ({ car, canPurchase }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={car.imageUrl}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">
          {car.make} {car.model} ({car.year})
        </h3>
        <div className="flex justify-between mt-2">
          <p className="text-gray-700">${parseInt(car.price).toLocaleString()}</p>
          <p className="text-gray-700">{parseInt(car.mileage).toLocaleString()} miles</p>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{car.description}</p>
        <Link
          to={`/cars/${car.id}`}
          className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {canPurchase ? 'View Details' : 'Login to Purchase'}
        </Link>
      </div>
    </div>
  );
};

export default CarCard;

