import {execute} from '../util/browser';
import {Predictor, Quotes} from '../predictor/predictor';
import {privateDecrypt} from 'crypto';

require("dotenv").config();

module.exports = {
    'login': function(browser: any) {
        browser.page.loginPage()
            .navigate()
            .doLogin();

        browser.page.homepage()
            .assertLoginSuccessful();
    },
    'predict': async function(browser: any) {
        browser.page.predictionPage()
            .navigate()
            .verifyContent();

        const quotes = await execute(browser, function() {
            return [...document.querySelectorAll("tbody .datarow")]
                .map(node => [...node.querySelectorAll(".kicktipp-wettquote")]
                    .map(q => q.textContent)
                    .map(text => parseFloat((text || "").replace(",", "."))))
        }, []);

        browser.perform((browser: any, done: Function) => {
            const predictor = new Predictor();
            const predictions = quotes.map(q => new Quotes(q))
                .map(predictor.predict.bind(predictor));


            browser.page.predictionPage()
                .navigate()
                .verifyContent()
                .fillInPredictions(predictions);

            done();
        });
    },
    'end': function(browser: any) {
        browser.end();
    }
};
