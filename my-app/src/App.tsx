import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from './hooksExercise';
import { useState, useEffect } from 'react';
import { ThemeContext, themes } from './themeContext';
import { setSyntheticLeadingComments } from 'typescript';



function App() {
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [currentTheme, setTheme] = useState(themes.light);

  const fav = (id: number) => {
    setFavorites((oldFavorites) => ({
      ...oldFavorites,
      [id]: !oldFavorites[id],
    }));
  }

  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const removeN = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  }

  const toggleTheme = () => {
    setTheme(currentTheme === themes.light ? themes.dark : themes.light)
  }

  return (
    <div style={{
      backgroundColor: currentTheme.background,
     
      minHeight: '100vh',
      padding: '20px',
    }}>
      <div className='app-container'>
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required>
            </input>
          </div>

          <div>
            <textarea
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required>
            </textarea>
          </div>

          <div >
            <select style={{ width: '111%' }}
              onChange={(event) =>
                setCreateNote({ ...createNote, label: event.target.value as Label })}
              required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div><button style={{ width: '111%' }} type="submit">Create Note</button></div>
        </form>

        <div className="notes-grid">
          {notes.map((note) => (
            <div 
              key={note.id}
              className="note-item">
              <div className="notes-header">
                <button onClick={() => fav(note.id)}>
                  {favorites[note.id] ? '❤️' : '♡'}
                </button>
                <button onClick={() => removeN(note.id)}>x</button>
              </div>
              <h2 contentEditable="true"> {note.title} </h2>
              <p contentEditable="true"> {note.content} </p>
              <p contentEditable="true"> {note.label} </p>
            </div>
          ))}
        </div>


        <div>
          <h3>List of favorites:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notes
              .filter(note => favorites[note.id])
              .map(favNote => (
                <li key={favNote.id}>{favNote.title}</li>
              ))}
          </ul>
        </div>

        <div>
          <button onClick={toggleTheme}>theme</button>
        </div>
      </div>
    </div>

  );
}

export default App;