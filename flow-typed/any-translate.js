/* @flow */

import type {
    Translator,
    TokenizedTranslate,
    Translate
} from 'any-translate/i/interfaces'

declare module 'any-translate' {
    declare function createMapTokens(t: Translate): TokenizedTranslate;
    declare function createTranslate(bf: Translator): TokenizedTranslate;
    declare function createHasTranslation(bf: Translator): (message: string) => boolean
}
