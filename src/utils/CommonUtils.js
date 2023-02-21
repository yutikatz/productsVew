const CommonUtils = {};

CommonUtils.getServerURL = function (){
    const ip = window._env.REST_IP;
    const port = window._env.PORT;
    return `http://${ip}:${port}`;

}


export default CommonUtils;
