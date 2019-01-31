import test from 'ava';
import tokens from './';

for (const token of tokens) {
    const {account, name} = token;
    const label = `[${account}::${name}]`;

    // Test for required fields
    const required = ["name", "account", "symbol", "precision", "logo", "website", "desc", "links", "whitepaper"];
    for (const field of required) {
        test(`${label} ${field}`, t => {
            if (token[field] === undefined) t.fail(`${label} ${field} is missing`)
            t.pass()
        })
    }
}
