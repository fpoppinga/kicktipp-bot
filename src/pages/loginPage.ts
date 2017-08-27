const loginCommands = {
    doLogin: function(this: NightWatchClient) {
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
        return `${this.api.launch_url}${this.api.globals.gameSlug}/login`
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
