const fs = require('fs')
const path = require('path')
const glob = require('glob')
const load = require('load-json-file')

for (const filepath of glob.sync(path.join(__dirname, "..", "tokens", "**", "*.json"))) {
  const token = require(filepath)
  const { account, symbol } = token;

  // Update missing fields
  token.whitepaper = token.whitepaper || "";
  token.website = token.website || "";

  // Load Stats
  const statsfilepath = path.join(__dirname, "..", "get_currency_stats", account, symbol + ".json")
  const stats = load.sync(statsfilepath)
  const issuer = stats[symbol].issuer;

  // Add issuer
  const formatedToken = {
    name: token.name || "",
    account: token.account || "",
    symbol: token.symbol || "",
    // issuer: issuer || "",
    precision: token.precision !== undefined ? token.precision : 4,
    desc: token.desc || "",
    website: token.website || "",
    logo: token.logo || "",
    links: token.links || {},
    whitepaper: token.whitepaper || "",
  }

  // Save Token
  fs.writeFileSync(filepath, JSON.stringify(formatedToken, null, 2), 'utf-8')
}
