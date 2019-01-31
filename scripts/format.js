const fs = require('fs')
const path = require('path')
const glob = require('glob')

for (const filepath of glob.sync(path.join(__dirname, "..", "tokens", "**", "*.json"))) {
  const token = require(filepath)
  token.whitepaper = token.whitepaper || "";
  token.website = token.website || "";
  fs.writeFileSync(filepath, JSON.stringify(token, null, 2), 'utf-8')
}
