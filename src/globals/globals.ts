const chromedriver = require("chromedriver");

module.exports = {
    'default': {
        gameSlug: 'mo-bro-kickers',
        waitForConditionTimeout: 5000,
    },

    before: function(done: Function) {
        console.log("Before!");
        chromedriver.start();
        done();
    },

    after: function(done: Function) {
        chromedriver.stop();
        done();
    }
};
