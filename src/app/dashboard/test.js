const BaseStore = require('../utils/BaseStore');

class DashboardService {
    constructor(props) {

    }

    fetchAuthorsLists() {
        fetch('http://localhost:4001/api/authors')
            .then(result => result.json())
            .then(authorlists => {
                AppDispatcher.dispatch({
                    actionType: DashboardEvents.AUTHORS_LOADED,
                    authorlists
                });
            });
    }

    getAuthorsListinClass() {
        console.log('this is class');
    }
}

export let DashboardServices = new DashboardService();
