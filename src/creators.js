/* @flow */

import type {
    Translator,
    TokenizedTranslate,
    TranslateArgs
} from 'any-translate/i/interfaces'

import createMapTokens from 'any-translate/createMapTokens'

export function createTranslate(bf: Translator): TokenizedTranslate {
    function translate(message: string, params: TranslateArgs): string {
        return bf.translate(message, params)
    }

    return createMapTokens(translate)
}

export function createHasTranslation(bf: Translator): (message: string) => boolean {
    return function hasTranslation(message: string): boolean {
        return bf.has(message)
    }
}
