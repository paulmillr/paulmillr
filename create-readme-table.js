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

  "micro-eth-signer": "@paulmillr/micro-eth-signer",
  "micro-sol-signer": "@paulmillr/micro-sol-signer",
  "micro-ordinals": "",
  "micro-key-producer": "@paulmillr/micro-key-producer",
  "micro-packed": "@paulmillr/micro-packed",
  "micro-ftch": "@paulmillr/micro-ftch",
  qr: "@paulmillr/qr",
  "micro-sr25519": "",
};
const misc_list = {
  "noble-hashes": gh_action("noble-hashes", "test-slow.yml", "Run slow tests"),
  "noble-ciphers": gh_action(
    "noble-ciphers",
    "test-slow.yml",
    "Run slow tests"
  ),
  "scure-btc-signer": gh_action(
    "scure-btc-signer",
    "test-slow.yml",
    "Run slow tests"
  ),
};
function buildTable(list) {
  const strs = list.map(badges).join("\n");
  console.log(`
| Project | Status | JSR | Misc |
|---------|--------|-----|------|
${strs}
`);
}

function gh_action(pkg, actionFile, name = "") {
  return `[![${name}](https://github.com/${user}/${pkg}/actions/workflows/${actionFile}/badge.svg)](https://github.com/${user}/${pkg}/actions/workflows/${actionFile})`;
}

function badges(pkg) {
  const jsr_name = gh_jsr[pkg];
  const ci = gh_action(pkg, "test-js.yml", "Run JS tests");
  const jsr = jsr_name
    ? `[![JSR version](https://jsr.io/badges/${jsr_name})](https://jsr.io/${jsr_name}) [![JSR Score](https://jsr.io/badges/${jsr_name}/score)](https://jsr.io/${jsr_name})`
    : "";
  const misc = misc_list[pkg] ?? "";

  return `| [${pkg}](https://github.com/${user}/${pkg}) | ${ci} | ${jsr} | ${misc} |`;
}

buildTable(Object.keys(gh_jsr));
