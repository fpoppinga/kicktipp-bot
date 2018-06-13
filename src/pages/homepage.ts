import {NightwatchAPI} from 'nightwatch';

const homepageCommands = {
    assertLoginSuccessful: function(this: NightwatchAPI) {
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
