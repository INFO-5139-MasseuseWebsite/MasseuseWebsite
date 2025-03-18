const match_bearer=/bearer\s+(.+)/i

const [valid, g1] = match_bearer.exec('BEARER  a')??[]
console.log(!!valid, g1)