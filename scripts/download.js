const axios = require('axios').default;
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const write = require('write-json-file')

async function get_currency_stats(code, symbol) {
    const label = `[${code} ${symbol}]`;
    const url = "https://api.eosn.io/v1/chain/get_currency_stats";
    try {
        const response = await axios.post(url, {code, symbol})
        return response.data
    } catch (e) {
        console.log(label, "cannot fetch <get_currency_stats>")
    }
}

async function main() {
    for (const filepath of glob.sync(path.join(__dirname, "..", "tokens", "**", "*.json"))) {
        const token = require(filepath)
        const {account, symbol} = token;

        const statsfilepath = filepath.replace(path.join(__dirname, "..", "tokens"), path.join(__dirname, "get_currency_stats"));

        if (!fs.existsSync(statsfilepath)) {
            const stats = await get_currency_stats(account, symbol)
            write.sync(statsfilepath, stats)
        }
    }
}

main()