/* @flow */
import type {
    TokenizedTranslate,
    TokenSubject,
    TokenizerParams,
    TranslateArgs,
    Translate
} from 'any-translate'

const TOKEN = '@_T_@'
const NAMETOKEN = '@_N_@'

function mapTokens(
    t: Translate,
    message: string,
    params?: TokenizerParams
): Array<TokenSubject>|string {
    const elements: {[id: string]: Function|Object} = {};
    const tokens: TranslateArgs = {};

    if (!params) {
        return t(message, tokens)
    }

    const keys: Array<string> = Object.keys(params);
    for (let i = 0, l = keys.length; i < l; i++) {
        const name: string = keys[i];
        const el: TokenSubject = params[name];
        if (typeof el === 'function' || typeof el === 'object') {
            const nm: string = NAMETOKEN + name + NAMETOKEN;
            elements[nm] = el
            tokens[name] = TOKEN + nm + TOKEN
        } else {
            tokens[name] = '' + el
        }
    }

    const str: string = t(message, tokens);

    if (typeof message !== 'string') {
        throw new Error('Message is not a string.')
    }

    const result: Array<TokenSubject> = [];
    const parts: Array<string> = str.split(TOKEN)

    let hasElements = false
    for (let i = 0, l = parts.length; i < l; i++) {
        const part: string = parts[i];
        if (part) {
            const element: TokenSubject = elements[part];
            if (element) {
                hasElements = true
            }
            result.push(element || part)
        }
    }

    return hasElements ? result : result.join('')
}

export default function createMapTokens(
    t: Translate
): TokenizedTranslate {
    return function _mapTokens(
        message: string,
        params: TokenizerParams
    ): Array<TokenSubject>|string {
        return mapTokens(t, message, params)
    }
}
