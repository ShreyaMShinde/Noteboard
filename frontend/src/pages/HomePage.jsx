import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound'; // ✅ new
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const location = useLocation();

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/notes');
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
  }, [location]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    setDeletingId(id);
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success("Note deleted successfully!");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {isRateLimited ? (
        <RateLimitedUI />
      ) : (
        <div className="max-w-6xl mx-auto p-4 mt-6">
          {loading ? (
            <div className="text-center text-primary py-10">Loading Notes...</div>
          ) : notes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              ))}
            </div>
          ) : (
            <NotesNotFound /> 
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
