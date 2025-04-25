# guidelines

Development & release guidelines for noble (https://paulmillr.com/noble), scure and other packages.

- [Status](#status)
- [Release order](#release-order)
- [Coding practices](#coding-practices)
- [Duplicated code](#duplicated-code)
- [Testing and fuzzing](#testing-and-fuzzing)
- [TODO](#todo)

## Release order

Before a release, integration tests should be ran. For example, if curves depend on hashes, they should install latest commit from github and try to run tests with it.

Release order is as follows:

1. noble-hashes, noble-ciphers, scure-base
2. noble-curves
3. scure-bip32, scure-bip39
4. micro-packed, scure-btc-signer
5. ethereum-cryptography

After that, 6. pull requests to consumers (such as ethereumjs-monorepo) can also be done.

## Coding practices

- Don't use bigint literals: instead of `123n`, use `BigInt(123)` or `BigInt('123')`
  - For compatibility with React Native and others
- Don't use array destruction, such as `let [a, b] = arr`
  - It overloads GC when used often, because it calls iterator protocol
  - Object destruction `{a, b} = obj` is fine
- Minimize `for-of`
  - Also uses iterator protocol, sometimes slow
- Minimize backtick quotes
  - Unfriendly to minifiers, sometimes even unsupported in subtle ways
- Don't use `\n` in strings: prefer `String.fromCharCode(10)`
  - Unfriendly to minifiers
- Typescript and prettier updates should be limited to once per 3-6 months
  - Their version diffs should be sanity-checked
- Helper packages are used to simplify development
  - paulmillr/jsbt is used to build files
  - micro-should is tiny 300-line testing framework
  - micro-bmark is tiny benchmarking framework

## Duplicated code

Some code is duplicated between packages, because it's better than adding an additional dependency.

Every time a method is changed, it should also be changed in other places.

- `hexToBytes`, `bytesToHex`, `concatBytes`, `isBytes` / `abytes` are identical within:
  - noble curves, ciphers, hashes
  - noble secp256k1, ed25519 (vars renamed for compactness)
  - scure-base, micro-packed
- Tests for `hexToBytes`, `bytesToHex`, `concatBytes` must be present within all those packages

## Testing and fuzzing

- hashes should run `test:dos` and `test:big`
- curves should adjust fast-check `NUM_RUNS` when ran on CI server

## TODO

- Fuzzing documentation
- CI server set-up documentation
- minified file build & upload (update JSBT)

New CI tasks:

- Compare NPM code to GitHub
- Scan NPM for malware
- Check for performance regressions, compare with previous commits / releases
