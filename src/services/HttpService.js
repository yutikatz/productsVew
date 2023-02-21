import CommonUtils from "@/utils/CommonUtils";

//HttpService._instance = null;
const HttpService = class {


    // static getInstance(){
    //     if(HttpService._instance == null){
    //         HttpService._instance = new HttpService();
    //     }
    //     return  HttpService._instance;
    // }

    get(url, params) {
        console.log({params});
        const baseUrs = CommonUtils.getServerURL();
        let end = '';
        if (params) {
            end = Object.entries(params)
                .reduce((state, [key, val]) => `${state}${key}=${val}&`, '?');
        }
        end = end.substring(0, end.length - 1);
        const queryString = `${baseUrs}${url}${end}`;
        console.log(queryString);
        return new Promise((resolve, reject) => {
            try {
                const xhttp = new XMLHttpRequest();
                xhttp.onload = function () {
                    resolve(JSON.parse(this.responseText));
                }
                xhttp.open("GET", queryString, true);
                xhttp.send();


            }
            catch (err) {
                this.logError(err);
                reject(err);
            }
        });
    }

    post(url, body) {
        console.log({body});
        let post = JSON.stringify(body)
        const baseUrs = CommonUtils.getServerURL();
        return new Promise((resolve, reject) => {
            try {
                let xhr = new XMLHttpRequest()
                const queryString = `${baseUrs}${url}`;
                xhr.onload = function () {
                    resolve(true)
                }
                xhr.open('POST', queryString, true)
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
                xhr.send(post);
            }
            catch (err) {
                this.logError(err);
                reject(err);
            }
        });
    }

    logError(error) {
        const { response, config, message } = error;

        console.log('ERROR', `rest call: ${response.statusText}, ${config.url}, ${message}`)
    }

}

export default HttpService;