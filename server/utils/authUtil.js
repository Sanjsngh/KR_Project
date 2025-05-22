const validator = require("validator");
const dns = require("dns");


const cleanUpAndValidate = ({username, email, password}) => {
    return new Promise((resolve, reject) => {
        if(!email || !password || !username) {
            reject({status: 400, message: "Missing credentials"});
        }

        if(typeof email != 'string') {
            reject({status: 400, message: "Invalid email"});
        }

        if(typeof username != 'string') {
            reject({status: 400, message: "Invalid username"});
        }

        if(typeof password != 'string') {
            reject({status: 400, message: "Invalid password"});
        }

        if(username.length <= 2 || username.length > 50) {
            reject({status: 400, message: "Username length should be 3-50"})
        }

        if(password.length <= 2 || password.length > 25) {
            reject({status: 400, message: "Password length should be 3-25"});
        }

        if(!validator.isEmail(email)) {
            reject({status: 400, message: "Invalid Email format"});
        }

        const domain = email.split("@")[1];
        // console.log(domain);

        dns.resolveMx(domain, (err, addresses) => {
            if(err || !addresses || addresses.length === 0) {
                reject({status: 400, message: "invalid email domain.no MX record"});
            } 
            
            return resolve();
        })
    })

}

module.exports = {cleanUpAndValidate}