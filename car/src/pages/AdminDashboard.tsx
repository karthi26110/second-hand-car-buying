import React, { useState } from 'react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import PurchasesList from '../components/PurchasesList';

const AdminDashboard: React.FC = () => {
  const [newCar, setNewCar] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    description: '',
    imageUrl: 'https://placehold.co/600x400',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'cars', editingId), newCar);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'cars'), newCar);
      }
      setNewCar({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        description: '',
        imageUrl: 'https://placehold.co/600x400',
      });
      alert('Car saved successfully!');
    } catch (error) {
      console.error('Error saving car:', error);
      alert('Failed to save car.');
    }
  };

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Car' : 'Add New Car'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Make</label>
                <input
                  type="text"
                  name="make"
                  value={newCar.make}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Model</label>
                <input
                  type="text"
                  name="model"
                  value={newCar.model}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={newCar.year}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={newCar.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  value={newCar.mileage}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={newCar.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
            >
              {editingId ? 'Update Car' : 'Add Car'}
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Purchase Requests</h2>
          <PurchasesList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

