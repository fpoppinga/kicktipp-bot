const homepageCommands = {
    assertLoginSuccessful: function(this: NightWatchClient) {
        return this.waitForElementVisible("@successBox");
    }
};

module.exports = {
    url: function() {
        return `${this.api.launch_url}${this.api.globals.gameSlug}/startseite`
    },
    commands: [homepageCommands],
    elements: {
        successBox: {
            selector: ".messagebox.success"
        }
    }
};
