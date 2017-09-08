import {execute} from '../util/browser';
import {Predictor, Quotes} from '../predictor/predictor';

module.exports = {
    before: function(browser : any) {
        // window size has to be set, when not in headless mode.
        browser.resizeWindow(1920, 1080);
    },
    'login' : function (browser : any) {
        browser.page.loginPage()
            .navigate()
            .doLogin();

        browser.page.homepage()
            .assertLoginSuccessful();
    },
    'predict' : async function (browser : any) {
        browser.perform(async(browser : any, done : Function) => {
            browser.page.predictionPage()
                .navigate()
                .verifyContent();

            const quotes = await execute(browser, function () {
                return [...document.querySelectorAll("tbody .datarow")]
                    .map(node => [...node.querySelectorAll(".kicktipp-wettquote")]
                        .map(q => q.textContent)
                        .map(text => parseFloat((text || "").replace(",", "."))))
            }, []);


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
    'end' : function (browser : any) {
        browser.end();
    }
};
