# Update FIFA World Cup 2018 
I tested this bot briefly in the official game `GAME_SLUG=wm18-tippspiel`. It seems to work, but it may or may not break in the future. Don't hesitate to file a bug, as I will probably not be using it actively. 

# Usage

1. Run `> yarn install`. 
2. setup an `.env` file with your kicktipp username, group and password as follows: 
  ```
  USER_NAME=bratwurst
  PASSWORD=very_secure_passw0rd
  GAME_SLUG=meine-tipprunde
  ```
3. Run `> yarn start` and enjoy.

# Pro Tips
* If you don't know, why the bot fails, run it in window mode: 
`yarn start --env window`
* Make sure, you have answered all non-result questions before starting the bot (e.g. "Who will become FIFA World Champion 2018?" - the bot does not know which team will dominate (although it is in favor of Germany...) 

# Feature Requests
* add a smarter predictor implementation, which does not rely on the btwin quota, so it can predict e.g. the whole Bundesliga season in one session
* dump nightwatch for something nicer, e.g. `puppeteer`.
