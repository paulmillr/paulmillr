// github to JSR package map
const user = "paulmillr";
const gh_jsr = {
  "noble-ciphers": "@noble/ciphers",
  "noble-curves": "@noble/curves",
  "noble-hashes": "@noble/hashes",
  "noble-post-quantum": "@noble/post-quantum",
  "noble-secp256k1": "@noble/secp256k1",
  "noble-ed25519": "@noble/ed25519",

  "scure-base": "@scure/base",
  "scure-bip32": "@scure/bip32",
  "scure-bip39": "@scure/bip39",
  "scure-btc-signer": "@scure/btc-signer",
  "scure-starknet": "@scure/starknet",
  "scure-sr25519": "@scure/sr25519",

  qr: "@paulmillr/qr",

  "micro-eth-signer": "@paulmillr/micro-eth-signer",
  "micro-sol-signer": "@paulmillr/micro-sol-signer",
  "micro-key-producer": "@paulmillr/micro-key-producer",
  "micro-zk-proofs": "@paulmillr/micro-zk-proofs",
  "micro-ordinals": "@paulmillr/micro-ordinals",
  "micro-packed": "@paulmillr/micro-packed",
  "micro-ftch": "@paulmillr/micro-ftch",
  "micro-wrkr": "@paulmillr/micro-wrkr",
};
const misc_list = {
  "noble-hashes": ci_info("noble-hashes", "test-slow.yml", "Slow tests"),
  "noble-ciphers": ci_info(
    "noble-ciphers",
    "test-slow.yml",
    "Slow tests"
  ),
  "noble-post-quantum": ci_info("noble-post-quantum", "test-slow.yml", "Slow tests"),
  "scure-btc-signer": ci_info(
    "scure-btc-signer",
    "test-slow.yml",
    "Slow tests"
  ),
};
function buildTable(list) {
  const strs = list.map(badges).join("\n");
  console.log(`
| Project | NPM    | JSR | CI | Misc |
|---------|--------|-----|----|------|
${strs}
`);
}

function ci_info(pkg) {
  const actionFile = ['micro-wrkr', 'micro-zk-proofs'].includes(pkg) ? 'test-js.yml' : 'test-ts.yml';
  return `[![${pkg}](https://github.com/${user}/${pkg}/actions/workflows/${actionFile}/badge.svg)](https://github.com/${user}/${pkg}/actions/workflows/${actionFile})`;
}

function npm_info(pkg) {
  const npm_name = /noble|scure/.test(pkg) ? gh_jsr[pkg] : pkg;
  return `[![NPM Version](https://img.shields.io/npm/v/${npm_name})](https://www.npmjs.com/package/${npm_name})`;
}

function jsr_info(pkg) {
  const jsr_name = gh_jsr[pkg];
  if (!jsr_name) return '';
  return `[![JSR version](https://jsr.io/badges/${jsr_name})](https://jsr.io/${jsr_name}) [![JSR Score](https://jsr.io/badges/${jsr_name}/score)](https://jsr.io/${jsr_name})`;
}

/**
 * @param {string} pkg
 * @returns string
 */
function badges(pkg) {
  const misc = misc_list[pkg] ?? "";
  return `| [${pkg}](https://github.com/${user}/${pkg}) | ${npm_info(pkg)} | ${jsr_info(pkg)} | ${ci_info(pkg)} | ${misc} |`;
}

buildTable(Object.keys(gh_jsr));
