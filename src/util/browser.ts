import {NightwatchAPI} from 'nightwatch';

export function execute<P, T>(browser: NightwatchAPI, body: (...params: P[]) => T, params: P[]): Promise<T> {
    return new Promise((resolve, reject) => browser.execute(body, params, (result) => {
        result.status >= 0 ? resolve(result.value) : reject(result.value);
    }));
}
