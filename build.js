const fs = require('fs')
const path = require('path')
const glob = require('glob')
const contracts = fs.readdirSync('./tokens')

const tokens = [];
for (const filepath of glob.sync(path.join(__dirname, "tokens", "**", "*.json"))) {
  const token = require(filepath)
  tokens.push(token)
}


let tokensMd = '|   Logo    | Symbol      | Account Name |\n| ----------- |:------------:|:------------:|\n'

for (const token of tokens) {
  const logo = `<img src="https://raw.githubusercontent.com/BlockABC/eos-tokens/master/tokens/${token.account}/${token.symbol}.png" width=30 />`
  const symbol = `[${token.symbol}](https://github.com/BlockABC/eos-tokens/blob/master/tokens/${token.account}/${token.symbol}.json)`
  const account = `[${token.account}](https://eospark.com/contract/${token.account})`
  tokensMd += `| ${logo} | ${symbol} | ${account} |\n`
}

tokensMd = '<!-- token_list_start -->\n' + tokensMd + '<!-- token_list_end -->'

let readme = fs.readFileSync('./readme.md', 'utf-8')

readme = readme.replace(/<!-- token_list_start -->(.|\s)*<!-- token_list_end -->/, tokensMd)

fs.writeFileSync('./readme.md', readme, 'utf-8')
fs.writeFileSync('./tokens.json', JSON.stringify(tokens, null, 2), 'utf-8')