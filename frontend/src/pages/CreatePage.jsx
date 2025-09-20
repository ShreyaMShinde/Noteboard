import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      
      await api.post('/notes', {
         title,
          content });
          
      toast.success("Note created successfully!");
     
      navigate('/', { state: { refresh: true } });
    } catch (error) {
      console.error("Error creating note:", error);
      if(error.response?.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.",{
          duration: 4000,
          icon : '⚠️',
        })
      }else{
        toast.error("Failed creating note");
      }
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-3xl mx-auto'>
          <Link to="/" className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='h-5 w-5 mr-2' />
            Back to Notes
          </Link>

          <div className='card bg-base-100 shadow-md'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSumbit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input
                    type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea
                    placeholder='Note Content'
                    className='textarea textarea-bordered'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
