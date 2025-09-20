import React from "react";
import { Link } from "react-router-dom";
import { FilePlus2Icon } from "lucide-react";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <FilePlus2Icon className="w-12 h-12 text-base-content/60 mb-4" />
      <h2 className="text-xl font-semibold text-base-content">
        No Notes Found
      </h2>
      <p className="text-base-content/70 mt-2 mb-4">
        You don’t have any notes yet. Start by creating a new one!
      </p>
      <Link to="/create" className="btn btn-primary">
        Create Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
