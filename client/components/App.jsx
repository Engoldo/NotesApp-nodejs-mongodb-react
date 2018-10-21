import React from 'react';

import NoteStore from '../stores/NoteStore';
import NoteActions from '../actions/NoteActions';

import NoteEditor from './NoteEditor.jsx';
import NoteGrid from './NoteGrid.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: NoteStore.isLoading(),
        notes: NotesStore.getNotes()
    };
}

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        NotesActions.loadNotes();
    },

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    },

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    },

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    },

    render() {
        return (
            <div className = 'App'>
                <h2 className='App__header'>NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NoteGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
                
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;