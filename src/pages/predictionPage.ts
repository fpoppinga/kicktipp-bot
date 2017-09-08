import {GameResult} from '../predictor/predictor';
import {privateDecrypt} from 'crypto';

const predictionCommands = {
    verifyContent: function(this: NightWatchClient) {
        return this.waitForElementVisible("@predictionForm")
            .waitForElementVisible("@predictionContent")
            .waitForElementVisible("@submitBtn");
    },

    fillInPredictions: function(this: NightWatchClient, predictions: GameResult[]) {
        const homeSelector = '[name*="heimTipp"]';
        const awaySelector = '[name*="gastTipp"]';

        for (let i = 0; i < predictions.length; i++) {
            const prediction = predictions[i];
            const elementSelector = `tbody .datarow:nth-of-type(${i + 1})`;

            this.waitForElementPresent(elementSelector);
            this.moveToElement(elementSelector, 0, 0);
            this.clearValue(elementSelector + " " + homeSelector);
            this.clearValue(elementSelector + " " + awaySelector);
            this.setValue(elementSelector + " " + homeSelector, prediction.home.toFixed(0));
            this.setValue(elementSelector + " " + awaySelector, prediction.away.toFixed(0));
        }

        this.click("@submitBtn");
    }
};

module.exports = {
    url: function() {
        return `${this.api.launch_url}${this.api.globals.gameSlug}/tippabgabe`
    },
    commands: [predictionCommands],
    elements: {
        predictionForm: {
            selector: "#tippabgabeForm"
        },
        submitBtn: {
            selector: '.formsubmit input[type="submit"]'
        },
        predictionContent: {
            selector: "tbody"
        }
    }
};
