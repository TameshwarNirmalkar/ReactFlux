import { AppDispatcher, RestResource } from '../common';
import Mapper from '../utils/Mapper';
import APICONFIG from '../utils/Config';

import DashboardEvents from './dashboard.events';
import DashboardStore from './dashboard.store';

const AuthorRestService = RestResource(APICONFIG.getDashboardApi());
const _FETCT_SET_TIME = 1000;

class DashboardAction {

    constructor(){
        this._updatePromise = null;
        this._createPromise = null;
    }

    fetchAuthorsLists() {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.AUTHORS_LOADING,
            notification: {
                message: 'Loading...'
            }
        });

        AuthorRestService.get('authors')
        .then(authorlists => {
            setTimeout(() => {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.AUTHORS_LOADED,
                    authorlists,
                    notification: {
                        message: 'Done'
                    }
                });
            }, _FETCT_SET_TIME);
        });
    }

    setTitle(title) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.TITLE_CHANGE,
            title: title
        });
    }

    setAuthor(author) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.AUTHOR_CHANGE,
            author: author
        });
    }

    setMaleFemale(gender){
        AppDispatcher.dispatch({
            actionType: DashboardEvents.GENDER_CHANGE,
            gender: gender.value
        });
    }

    saveDashboard() {
        this._saveDashboard();
    }

    _saveDashboard() {
        // _.debounce(() => {
        const data = Mapper.toBackend(DashboardStore.getDashboard());
        data.id ? this._updateDashboard(data) : this._createDashboard(data);
        // }, 300);
    }

    _createDashboard(data) {
        return this._execute(
            this._createPromise = AuthorRestService.post('authors', JSON.stringify(data))
        );
    }

    _updateDashboard(data) {
        return this._execute(
            this._updatePromise = AuthorRestService.put('authors/' + data.id, JSON.stringify(data))
        );
    }

    onRowUpdate(id) {
        AuthorRestService.get('authors/' + id).then(authordetails => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.FILL_AUTHOR,
                author: Mapper.fromBackend(authordetails)
            });
        });
    }

    onRowDelete(id) {
        AuthorRestService.delete('authors/' + id).then(() => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.DELETE_AUTHOR,
                authorId: id
            });
        });

    }

    _execute(endpoint) {
        AppDispatcher.dispatch({
            actionType: DashboardEvents.DASHBOARD_SAVE_IN_PROGRESS
        });

        return endpoint.then(author => {
            AppDispatcher.dispatch({
                actionType: DashboardEvents.DASHBOARD_SAVED,
                author: Mapper.fromBackend(author)
            });

            return author;
        }).fail(error => {

            if (this._updatePromise && this._updatePromise.isAborted) {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.DASHBOARD_SAVE_ABORTED,
                    error: error
                });

                return;
            }

            AppDispatcher.dispatch({
                actionType: DashboardEvents.DASHBOARD_SAVE_FAILED
            });
        });
    }

    _setUrl(id) {
        const locationUrl = window.location.href.replace(/[^\/]+((\?.*)?$|\/$)/, id);
        window.history.replaceState({}, 'Dashboard', locationUrl);
    }
}

const DashboardActions = new DashboardAction();

export default DashboardActions;
