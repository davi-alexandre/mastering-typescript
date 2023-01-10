// XXX DECLARATION FILES

// npm install -g http-server
// $ http-server
class GlobalLogger {
	public static logGlobalsToConsole() {
		for (let email of CONTACT_EMAIL_ARRAY) {
			console.log(`found contact : ${email}`);
		}
	}
}
window.onload = () => {
	GlobalLogger.logGlobalsToConsole();
};
