# any-translate

Decorator for any i18n library.
Useful, when translation parameters is not only strings. For example, with react:

```js

function Widget(t: TokenizedTranslate, message: string): Element {
    return (
        <div>
            {t('Hello #{message}, #{link}', {
                message,
                link: <a href="/user">{t('user')}</a>
            })}
        </div>
    )
}
```

Where t returns array of strings and functions.

Only [babelfish](https://github.com/nodeca/babelfish) supported at current moment via [any-translate-adapter-babelfish](https://github.com/zerkalica/any-translate-adapter-babelfish).

## Example

```js
/* @flow */

import type {
    TokenSubject,
    Translator,
    TokenizedTranslate
} from 'any-translate/i/interfaces'

import {
    createTranslate,
    createHasTranslation
} from 'any-translate'

import {createBabelfishTranslator} from 'any-translate-adapter-babelfish'

function onNotPresentTranslation(locale: string, message: string): void {
    console.log('Not present: ', locale, message)
}

const translator: Translator = createBabelfishTranslator(
    'ru_RU',
    {
        'module1': {
            'hello': 'Привет, #{name}',
            'helloWithLink': 'Привет, #{name}, ссылка: #{link}.'
        }
    },
    onNotPresentTranslation
);

const t: TokenizedTranslate = createTranslate(translator);
const hasT: (message: string) => boolean = createHasTranslation(translator);

function LinkWidget(some: any): void {
    //
}

const translated1: Array<TokenSubject>|string = t('module1.hello', {
    name: 'Вася',
    link: LinkWidget
});
// 'Привет, Вася'

const translated2: Array<TokenSubject>|string = t('module1.helloWithLink', {
    name: 'Вася',
    link: LinkWidget
});
// ['Привет, Вася, ссылка: ', LinkWidget, '.']
```
