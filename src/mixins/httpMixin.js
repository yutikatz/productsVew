import HttpService from "./../services/HttpService";

export default {

    methods: {
        async getProducts(fieldToSort) {
            const serviceURL = "/products/getProducts";
            const params = { fieldToSort: fieldToSort };
            const httpService = new HttpService();
            return httpService.get(serviceURL, params);
        },
        async addOneProduct(name, description) {
            const serviceURL = "/products/insertproduct";
            const body = { name, description }; 
            const httpService = new HttpService();
            httpService.post(serviceURL, body)
        },
        async deleteOneProduct(code) {
            const serviceURL = "/products/deleteproduct";
            const params = { code };
            const httpService = new HttpService();
            return httpService.get(serviceURL, params);
        },
        async editOneProduct(code, name, description) {
            const serviceURL = "/products/editproduct";
            const body = { code, name, description };
            const httpService = new HttpService();
            return httpService.post(serviceURL, body);
        },
        async uploadOneImage(isNew,code, name) {
            let serviceURL
            if (isNew) {
                serviceURL = "/products/insertimg";
            }
            else {
                serviceURL = "/products/editimg";
            }
            const body = { code, router: name };
            const httpService = new HttpService();
            return httpService.post(serviceURL, body);          
        },
        async deleteIMGFromProduct(code) {
            const serviceURL = "/products/deleteimg";
            const params = { code };
            const httpService = new HttpService();
            return httpService.get(serviceURL, params);
        },
    }

};