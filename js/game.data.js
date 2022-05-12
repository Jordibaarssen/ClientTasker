//const $ = require("browser-sync");
Game.Data = (function(){
    console.log('hallo, vanuit module Data');

    const configMap = {
        mock: [
            {
                url: 'api/Spel/Beurt',
                data: 0
            }
        ]
    };

    let stateMap = {
        environment : 'production'
    };

    const getMockData = function(url){

        const mockData = configMap.mock.find(item => item.url === url);

        return new Promise((resolve, reject) => {
            resolve(mockData);
        });

    };

    const get = function(url) {
        if(stateMap.environment === "production") {
            return $.get(url)
                .then(r => {
                    return r
                })
                .catch(e => {
                    console.log(e.message);

                });
        }else if(stateMap.environment === "development") {
            return getMockData(url);
        }
    };

    const put = function(url) {
        if(stateMap.environment === "production") {
            return new Promise(resolve => {
                $.ajax({
                    url: url,
                    type: 'PUT',
                    success: function (r) {
                        resolve(r);
                    }
                })
            });
        }else if(stateMap.environment === "development") {
            return getMockData(url);
        }
    };

    const funFact = async function () {
        return await $.get('https://api.aakhilv.me/fun/facts');
    };

    const privateInit = function(url){
        if(stateMap.environment === "development")
        {
            return getMockData(url);
        }else if(stateMap.environment === "production")
        {
            //doe request aan server
            //xhttp.open("GET", "ajax_info.txt", true);
            //xhttp.send();

        }else
        {
            throw new Error("de environment is geen development of production")
        }
    };

    return{
        init: privateInit,
        get,
        put,
        funFact,
    }

})();