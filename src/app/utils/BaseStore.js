import { AppDispatcher } from '../common';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

const BaseStore = Object.assign({}, EventEmitter.prototype, {

    registerWithDispatcher(callback) {
        this.dispatchToken = AppDispatcher.register(callback);
    },

    unregisterFromDispatch() {
        AppDispatcher.unregister(this.dispatchToken);
        this.dispatchToken = null;
    },

    _emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    waitFor(stores) {
        AppDispatcher.waitFor.call(AppDispatcher, stores);
    }
});

export default BaseStore;
