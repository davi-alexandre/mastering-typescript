"use strict";
// XXX DECLARATION FILES
// npm install -g http-server
// $ http-server
class GlobalLogger {
    static logGlobalsToConsole() {
        for (let email of CONTACT_EMAIL_ARRAY) {
            console.log(`found contact : ${email}`);
        }
    }
}
window.onload = () => {
    GlobalLogger.logGlobalsToConsole();
};
//# sourceMappingURL=7.js.map