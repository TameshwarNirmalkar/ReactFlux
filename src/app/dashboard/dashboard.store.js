import _ from 'lodash';
import update from 'react-addons-update';

import BaseStore from '../utils/BaseStore';
import DashboardEvents from './dashboard.events';
import DashboardModel from './dashboard.model';

let _authorlists = null;
let _dashboard = new DashboardModel();

let _notification = null;

const DashboardStore = Object.assign({}, BaseStore, {
/*class DashboardStore extends BaseStore {

    constructor(){
        super();
        console.log('BAse', BaseStore );
    }*/

    getNotification(){
        return _notification;
    },

    getAuthors() {
        return _authorlists;
    },

    getDashboard() {
        return _dashboard;
    },

    getRowColor() {
        return 'success';
    },

    getButtonDisabled(){
        return true;
    },

    isType(author){
        return author.gender;
    },

    _setNotification(notification){
        _notification = notification;
    },

    _setAuthors(authorlists) {
        _authorlists = authorlists;
    },

    _setTitle(title) {
        this._updateDashboardWith({ title: { $set: title } });
    },

    _setAuthor(author) {
        this._updateDashboardWith({ author: { $set: author } });
    },

    _setGender(gender){
        this._updateDashboardWith({ gender: { $set: gender } });
    },

    _setDashboard(dashboard) {
        this._updateDashboardWith({ $set: dashboard });
    },

    _updateDashboardWith(updates) {
        _dashboard = update(_dashboard, updates);
    },

    _saveInProgress() {
        const notification = { 'message': 'Loading...' };
        this._setNotification(notification);
    },

    _saveDashboard(payload) {
        const oldlist = this.getAuthors();
        const getkey = _.find(oldlist, { 'id': payload.author.id });
        if(getkey){
            _.merge(getkey, payload.author);
        }else{
            this._setDashboard(oldlist.push(payload.author));
        }
        
        const notification = { 'message': 'Done' };
        this._setNotification(notification);
        
    },

    _resetDashboard() {
        _dashboard = new DashboardModel();
        DashboardStore._emitChange();
    },

    _deleteAuthor(authorId){
        const allAuthors = this.getAuthors();
        _.remove(allAuthors, { id : authorId });
    },
});

DashboardStore.registerWithDispatcher(payload => {
    switch (payload.actionType) {

        case DashboardEvents.AUTHORS_LOADING:
            DashboardStore._setNotification(payload.notification);
            DashboardStore._emitChange();
            break;
        
        case DashboardEvents.AUTHORS_LOADED:
            DashboardStore._setAuthors(payload.authorlists);
            DashboardStore._setNotification(payload.notification);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.TITLE_CHANGE:
            DashboardStore._setTitle(payload.title);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.AUTHOR_CHANGE:
            DashboardStore._setAuthor(payload.author);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.GENDER_CHANGE:
            DashboardStore._setGender(payload.gender);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DASHBOARD_SAVE_IN_PROGRESS:
            DashboardStore._saveInProgress();
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DASHBOARD_SAVED:
            DashboardStore._saveDashboard(payload);
            DashboardStore._resetDashboard();
            break;
        
        case DashboardEvents.FILL_AUTHOR:
            DashboardStore._setDashboard(payload.author);
            DashboardStore.isType(payload.author);
            DashboardStore._emitChange();
            break;

        case DashboardEvents.DELETE_AUTHOR:
            DashboardStore._deleteAuthor(payload.authorId);
            DashboardStore._emitChange();
            break;
    }
});

module.exports = DashboardStore;
