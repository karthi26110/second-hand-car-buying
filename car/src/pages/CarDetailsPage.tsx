import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Car } from '../types';
import { useAuth } from '../context/AuthContext';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchaseRequestSent, setPurchaseRequestSent] = useState(false);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    const fetchCar = async () => {
      try {
        const docRef = doc(db, 'cars', id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setCar({ id: docSnap.id, ...docSnap.data() } as Car);
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching car:', error);
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handle
