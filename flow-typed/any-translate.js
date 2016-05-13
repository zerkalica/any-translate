/* @flow */

declare module 'any-translate' {
    declare type TokenSubject = string|Function|Object;
    declare type TokenizerParams = {[id: string]: TokenSubject};
    declare type TranslateArgs = {[id: string]: string};
    declare type Translate = (
        message: string,
        params: TranslateArgs
    ) => string;

    declare type Tr = (
        message: string,
        params?: TokenizerParams
    ) => Array<TokenSubject>|string;

    declare type NeedTranslate = (locale: string, message: string) => void;

    declare interface Translator {
        add(phrases: Object): void;
        translate(message: string, params: TranslateArgs): string;
        has(message: string): boolean;
    }

    declare type CreateTranslator = (
        locale: string,
        phrases: Object,
        needTranslate?: NeedTranslate
    ) => Translator;

    declare type HasTranslation = (message: string) => boolean;

    declare function createMapTokens(t: Translate): Tr;
    declare function createTranslate(bf: Translator): Tr;
    declare function createHasTranslation(bf: Translator): HasTranslation
}
