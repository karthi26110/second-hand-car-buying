import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import CarCard from '../components/CarCard';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cars'));
        const carsData: Car[] = [];
        querySnapshot.forEach((doc) => {
          carsData.push({ id: doc.id, ...doc.data() } as Car);
        });
        setCars(carsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search cars by make or model..."
          className="w-full max-w-md p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} canPurchase={!!currentUser} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

