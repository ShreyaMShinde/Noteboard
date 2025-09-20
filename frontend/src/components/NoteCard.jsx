import React from 'react';
import { Link } from "react-router-dom"; 
import { PenSquareIcon, Trash2Icon, Loader2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils';

const NoteCard = ({ note, onDelete, deletingId }) => {
  const handleDeleteClick = (e) => {
    e.preventDefault(); 
    onDelete(note._id);
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#de7c0b]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={handleDeleteClick}
              disabled={deletingId === note._id} // ✅ disable while deleting
            >
              {deletingId === note._id ? (
                <Loader2Icon className="size-4 animate-spin" /> // ✅ spinner
              ) : (
                <Trash2Icon className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
