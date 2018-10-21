import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
    return {
        id: note._id,
        title: note.title,
        text: note.text,
        color: '#ffffff',
        createAt: note.createAt
    };
}

const TaskStore = Object.assign({}, EventEmitter.prototype, {
    _isLoading() {
        return _isLoading;
    },

    getNotes() {
        return _notes;
    },

    emitChange: function() {
        this.emitChange(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeChangeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_NOTES_REQUEST: {
            _isLoading = true;

            TaskStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map( formatNote );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;