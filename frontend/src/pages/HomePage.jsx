import React, { useState, useEffect } from 'react';
import api   from '../lib/axios';
import { useLocation } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation(); 

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
      setIsRateLimited(false);
    } catch (error) {
      console.error("Error Fetching Notes:", error);
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error(error.response?.data?.message || "Error Fetching Notes");
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchNotes();
  }, []);

  
  useEffect(() => {
    if (location.state?.refresh) {
      fetchNotes();
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited ? (
        <RateLimitedUI />
      ) : (
        <div className="max-w-6xl mx-auto p-4 mt-6">
          {loading && (
            <div className="text-center text-primary py-10">
              Loading Notes...
            </div>
          )}
          {notes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}
          {!loading && notes.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              No notes available. Create one!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
