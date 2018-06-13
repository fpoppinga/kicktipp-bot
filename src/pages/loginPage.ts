import {NightwatchAPI} from 'nightwatch';

const loginCommands = {
    doLogin: function(this: NightwatchAPI) {
        return this.waitForElementVisible("@login")
            .waitForElementVisible("@password")
            .waitForElementVisible("@loginSubmitBtn")
            .setValue("@login", process.env.USER_NAME || "")
            .setValue("@password", process.env.PASSWORD || "")
            .click("@loginSubmitBtn");
    }
};

module.exports = {
    url: function(): string {
        return `${this.api.launch_url}${this.api.globals.gameSlug}/profil/login`
    },
    commands: [loginCommands],
    elements: {
        login: {
            selector: "#kennung"
        },
        password: {
            selector: "#passwort"
        },
        "loginSubmitBtn": {
            selector: '.formsubmit input[type="submit"]'
        }
    }
};
