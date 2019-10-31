const ATM = {
    isAuth: false, 
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    //logs
    logs: [],
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user" }
    ],
    // authorization
    auth(id, pin) {
        const user = this.users.find(val => (val.id == id) && (val.pin == pin) );
        
        if(user === undefined) {
            console.log('autorization fail');
            this.isAuth = false;
        } else {
            console.log('autorization complete');
            this.currentUser = user;
            this.isAuth = true;
        }
    },
    // check current debet
    check() {
        this.isAuth ? console.log(`cash: ${this.currentUser.debet}`) : console.log('access denied');
    },
    // get cash - available for user only
    getCash(amount) {
        if( (this.cash - amount) < 0) {
            console.log('ATM has not enough money!');
        } else {
            if(this.currentUser.type == 'user') {
                if(this.currentUser.debet >= amount) {

                    this.currentUser.debet -= amount;
                    this.cash -= amount;
                    this.addLogs('get', amount);
                    this.check();
                } else {
                    console.log('not enough cash on the debet card');
                }
            
            } else {
                console.log('authorization required');
            }
        }
    },
    // load cash - available for user only
    loadCash(amount) {
        if(this.currentUser.type == 'user') {
            this.currentUser.debet += amount;
            this.cash += amount;
            
            this.addLogs('load', amount);
            this.check();
        }
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if(this.currentUser.type == 'admin') {
            this.cash += amount;
            this.addLogs('loadATM', amount);
            console.log(`ATM:${this.cash}`);
        }
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if(this.currentUser.type == 'admin') {
            console.table(this.logs);
        }
    },
    // log out
    logout() {
        this.isAuth = false;
        this.currentUser = {};
    },

    //atm logs
    addLogs(operation, value) {
        this.logs.push("user:"+ this.currentUser.id +", " + operation + ":" + value);
    }
};
