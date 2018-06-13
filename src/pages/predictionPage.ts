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

        this.waitForElementPresent("tbody .datarow");
        for (let i = 0; i < predictions.length; i++) {
            const prediction = predictions[i];
            const elementSelector = `tbody .datarow:nth-of-type(${i + 1})`;

            this.isVisible(elementSelector + " .nichttippbar", (visible) => {
                if (visible) return;

                const homeInputSelector = elementSelector + homeSelector;
                const awayInputSelector = elementSelector + awaySelector;

                this.clearValue(homeInputSelector);
                this.clearValue(awayInputSelector);
                this.setValue(homeInputSelector, prediction.home.toFixed(0));
                this.setValue(awayInputSelector, prediction.away.toFixed(0));
            });
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
