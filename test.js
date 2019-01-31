import fs from "fs";
import test from 'ava';
import path from "path";
import load from "load-json-file";
import tokens from './';

for (const token of tokens) {
    const {account, symbol, precision} = token;
    const label = `[${account}::${symbol}]`;

    // Test for required fields
    const required = ["name", "account", "symbol", "precision", "logo", "website", "desc", "links", "whitepaper"];
    for (const field of required) {
        test(`${label} ${field}`, t => {
            if (token[field] === undefined) t.fail(`${label} ${field} is missing`)
            t.pass()
        })
    }

    // Validate against `get_currency_stats`
    // must `download.js` first
    const statsfilepath = path.join(__dirname, "get_currency_stats", account, symbol + ".json")

    test(`${label} get_currency_stats`, t => {
        if (!fs.existsSync(statsfilepath)) t.fail(`${label} missing <get_currency_stats>`)
        const stats = load.sync(statsfilepath)
        const [amount, sym] = stats[symbol].supply.split(' ');
        let [major, minor] = amount.split('.')
        if (!minor) minor = ""
        if (minor.length !== precision) t.fail(`${label} precision is mismatched (${minor.length} !== ${precision})`)
        if (!stats[symbol].max_supply) t.fail(`${label} max_supply is missing`)
        t.pass()
    })
}
