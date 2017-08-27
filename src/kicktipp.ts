const LoginPage = require("./pages/loginPage");

module.exports = {
    'login': function(browser: any) {
        browser.page.loginPage()
            .navigate();
    }
};
