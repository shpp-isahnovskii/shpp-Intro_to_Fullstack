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

        this.logout();

        const user = this.users.find(val => (val.id == id) && (val.pin == pin) );

        if(user) {
            this.currentUser = user;
            this.isAuth = true;
            console.log('autorization complete');
        } else {
            console.log('autorization faild');
        }

    },
    // check current debet
    check() {
        this.isAuth ? console.log(`cash: ${this.currentUser.debet}`) : console.log('access denied');
    },
    // get cash - available for user only
    getCash(amount) {
        if( this.checkAuth('user') ) { //check user is valid and login
            const ATMCash = checkATMCash.bind(this);
            ATMCash();
        }

        function checkATMCash() {

            if( (this.cash - amount) >= 0) { //check ATM cash
                const userCash = checkUserCash.bind(this);
                userCash();
            } else {
                console.log('ATM has not enough money!');
            }
        }
        function checkUserCash() {
            if(this.currentUser.debet >= amount) { //check User cash
                const operation = confirmOperation.bind(this);
                operation();
            } else {
                console.log('not enough cash on the debet card');
            }
        }
        function confirmOperation() { //get money
            this.currentUser.debet -= amount;
            this.cash -= amount;
            this.addLogs('get', amount);
            this.check();
        }
    },
    // load cash - available for user only
    loadCash(amount) {
        if( this.checkAuth('user') ) {
            this.currentUser.debet += amount;
            this.cash += amount;
            this.addLogs('load', amount);
            this.check();
        }
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if( this.checkAuth('admin') ) {
            this.cash += amount;
            this.addLogs('loadATM', amount);
            console.log(`ATM:${this.cash}`);
        }
    },
    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if( this.checkAuth('admin') ) {
            console.table(this.logs);
        }
    },
    // log out
    logout() {
        if(this.isAuth) {
            this.isAuth = false;
            this.currentUser = {};
        } else {
            console.log('login first');
        }
    },

    //atm logs
    addLogs(operation, value) {
        this.logs.push("user:"+ this.currentUser.id +", " + operation + ":" + value);
    },

    //authorization name check
    checkAuth(name) {

        if(this.isAuth) { //authorization - true
            if( this.currentUser.type !== name ) { //name - false
                console.log("you have no permissions");
                return false;
            } else {
                return true; //name - true
            }
        } else { 
        }
        console.log('authorization required'); //authorization - false 
        return false;
    }
};
