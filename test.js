import test from 'ava';
import tokens from './';

test('precision does not exist', t => {
    for (const token of tokens) {
        if (token.precision === undefined) t.fail(`[${token.account} ${token.name}] is missing precision`)
    }
    t.pass();
});
