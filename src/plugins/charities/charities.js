
const TiltifyClient = require("tiltify-api-client")

export default class CharityPlugin {

    constructor(Vue) {
        this.Vue = Vue        
        this._client = new TiltifyClient(process.env.VUE_APP_TILTIFY_ACCESS_TOKEN);
        this._campaigns = { sfs1: 159701, svs3: 100671 };
    }

    getAllCauses() {
        let ids = Object.values(this._campaigns );
        let allData = [];
        let promises = [];

        for (let i in ids) {
            let id = ids[i];
            promises.push(this._client.Campaigns.get(id, function (data) {
                allData[i] = data
            }));
        }


        return Promise.all(promises).then(() => {
            // console.log(data);

            return allData;
        });
    }
    
    getCause(name) {
        let id = this._campaigns [name];
        console.log(id);
        this._client.Campaigns.get(id, function (data) {
            return data;
        });
    }

    getRewards(name) {
        let id = this._campaigns [name];
        this._client.Campaigns.getRewards(id, function (data) {
            return data;
        });
    }

    getRecentDonations(name) {
        let id = this._campaigns [name];
        this._client.Campaigns.getRecentDonations(id, function (data) {
            return data;
        });
    }

    getDonations(name) {
        let id = this._campaigns   [name];
        this._client.Campaigns.getDonations(id, function (data) {
            return data;
        });

    }


    static install(Vue, options) {
        Vue.prototype.$charity = new CharityPlugin(Vue)
    }

}
