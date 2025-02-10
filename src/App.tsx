import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  time: number;
  color: string;
}

const COLORS = [
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-pink-100',
  'bg-purple-100'
];

function App() {
  const [notes, setNotes] = useState<Note[]>(() => 
    JSON.parse(localStorage.getItem('notes-app') || '[]')
  );

  const addNote = (color: string) => {
    setNotes(prev => [...prev, {
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      text: "",
      time: Date.now(),
      color,
    }]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const updateText = (text: string, id: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, text } : note
    ));
  };

  useEffect(() => {
    localStorage.setItem('notes-app', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Notes App</h1>
          <div className="flex gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => addNote(color)}
                className={`p-3 rounded-full ${color} hover:opacity-80 transition-opacity`}
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`${note.color} rounded-lg p-4 shadow-md relative group`}
            >
              <textarea
                className="w-full h-40 bg-transparent resize-none focus:outline-none text-gray-800 placeholder-gray-500"
                placeholder="Type your note here..."
                value={note.text}
                onChange={(e) => updateText(e.target.value, note.id)}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">
                  {new Date(note.time).toLocaleDateString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-200 rounded-full"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No notes yet</p>
            <p className="mt-2">Click the plus button above to create a note</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;