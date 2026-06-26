# `tibia-json`

This repository tracks the following upstream TibiaWiki pages that produce JSON in hacky ways:

- [`https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson`](https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson)
- [`https://tibia.fandom.com/wiki/User:Mathias/test/bestiaryjson`](https://tibia.fandom.com/wiki/User:Mathias/test/bestiaryjson)
- [`https://tibia.fandom.com/wiki/User:Mathias/test/bosstiaryjson`](https://tibia.fandom.com/wiki/User:Mathias/test/bosstiaryjson)
- [`https://tibia.fandom.com/wiki/User:Mathias/test/soulcoresjson`](https://tibia.fandom.com/wiki/User:Mathias/test/soulcoresjson)

The JSON isn’t exactly nicely formatted, but it’s what the wiki can output without much hassle. The idea is that scripts can use the data to massage it into whatever format they need.

## Update the data

This repository ~~and its GitHub Action~~ collect the latest snapshots of these data sets.

Unfortunately, ever since TibiaWiki enabled Cloudflare, the automated process no longer works. The manual update process is as follows:

1. Open each of the links above, copying the JSON on each page and saving it to the respective `data/*-raw.json` file. For example, [`https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson`](https://tibia.fandom.com/wiki/User:Mathias/test/achievementsjson) goes in `data/achievements-raw.json`.
2. Run `npm run build`.
3. Commit and push the changes.
