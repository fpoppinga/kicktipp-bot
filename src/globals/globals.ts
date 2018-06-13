require("dotenv").config();
const chromedriver = require("chromedriver");

module.exports = {
    'default': {
        gameSlug: process.env.GAME_SLUG,
        waitForConditionTimeout: 15000,
    },
    'window': {
        gameSlug: process.env.GAME_SLUG,
        waitForConditionTimeout: 15000
    },

    before: function(done: Function) {
        chromedriver.start();
        done();
    },

    after: function(done: Function) {
        chromedriver.stop();
        done();
    }
};
