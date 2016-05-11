/* @flow */

import type {
    Translator,
    TokenizedTranslate,
    TranslateArgs,
    HasTranslation
} from 'any-translate'

import createMapTokens from 'any-translate/createMapTokens'

export function createTranslate(bf: Translator): TokenizedTranslate {
    function translate(message: string, params: TranslateArgs): string {
        return bf.translate(message, params)
    }

    return createMapTokens(translate)
}

export function createHasTranslation(bf: Translator): HasTranslation {
    return function hasTranslation(message: string): boolean {
        return bf.has(message)
    }
}
