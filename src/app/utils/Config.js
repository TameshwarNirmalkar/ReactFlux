class ApiConfig {
	getDashboardApi(){
		const api = {
	    	appApiPath: "http://localhost:4001/",
	    	backendDateFormat: "YYYY-MM-DDTHH:mm:ss.SSSZ",
	    	baseUrl: "/",
	    	prefix: "dashboard",
	    	protocol: "https"
	    };

		return api;
	}
}

const APICONFIG = new ApiConfig();

export default APICONFIG;
