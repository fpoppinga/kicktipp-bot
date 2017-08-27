export class GameQuote {
    constructor(private _home : number,
                private _draw : number,
                private _away : number) {}

    public get home(): number {
        return this._home;
    }

    public get draw(): number {
        return this._draw;
    }

    public get away(): number {
        return this._away;
    }
}

export class Quotes extends GameQuote {
    constructor(rawQuotes: number[]) {
        if (rawQuotes.length !== 3) {
            throw new Error("Invalid number of raw quotes!");
        }

        super(rawQuotes[0], rawQuotes[1], rawQuotes[2]);
    }
}

export class GameResult {
    constructor(private _home : number,
                private _away : number) {}

    public get home(): number {
        return this._home;
    }

    public get away(): number {
        return this._away;
    }

    static draw(score: number): GameResult {
        return new GameResult(score, score);
    }
}

export interface IPredictor {
    predict(quotes: Quotes): GameResult;
}

export class Predictor implements IPredictor {
    private MAX_GOALS = 6;
    private DOMINATION_THRESHOLD = 10;
    private DRAW_THRESHOLD = 0.5;
    private NONLINEARITY = 0.4;

    predict(quotes : Quotes) : GameResult {
        const difference = Math.abs(quotes.away - quotes.home);

        if (difference < this.DRAW_THRESHOLD) {
            return GameResult.draw(1);
        }

        const totalGoals = Math.min((difference / this.DOMINATION_THRESHOLD), 1) * this.MAX_GOALS;
        const ratio = ((quotes.home > quotes.away
            ? quotes.home / quotes.away
            : quotes.away / quotes.home)
            / (quotes.home + quotes.away)) ** this.NONLINEARITY;

        let winner = Math.round(totalGoals * ratio);
        let looser = Math.round( totalGoals * (1 - ratio) );

        if (winner <= looser) {
            winner++;
        }

        if (quotes.home > quotes.away) {
            return new GameResult(looser, winner)
        } else {
            return new GameResult(winner, looser);
        }
    }
}
