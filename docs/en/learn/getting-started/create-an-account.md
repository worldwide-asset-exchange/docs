---
title: Create an Account
description: Create a WAX account with My Cloud Wallet, Anchor Account Creator, or a signupwaxwax transfer.
---

# Create a WAX Account

A wallet holds your keys. A WAX account is the on-chain name those keys control. You need both before you can hold tokens, NFTs, or use apps.

If you have not chosen a wallet yet, start with [Choosing a Wallet](/learn/getting-started/choosing-a-wallet).

## Account Names

WAX uses human-readable account names, not long hexadecimal addresses.

- Standard self-serve names are **12 characters**
- Allowed characters are `a-z` and `1-5`
- Names are lowercase
- Check availability on [WAXBlock](https://waxblock.io/) before you pay to create one

My Cloud Wallet walks you through naming during signup. The other methods below use a name you choose in advance.

## Creation Methods

| Method | Fee | Custody | Best for |
| --- | --- | --- | --- |
| [My Cloud Wallet](#my-cloud-wallet) | 5 WAX | Passkey wallet | New users and the simplest path |
| [Anchor Account Creator](#anchor-account-creator) | $0.99 USD | Your keys | Users who want Anchor from day one |
| [signupwaxwax transfer](#create-by-transfer) | Paid in WAX | Your keys | Users who already hold WAX on an exchange or another account |

### My Cloud Wallet

My Cloud Wallet is the easiest way to create an account. Signup creates the on-chain account for you and keeps access in the Cloud Wallet passkey flow.

**Fee:** 5 WAX, paid during signup.

1. Open [My Cloud Wallet](https://www.mycloudwallet.com)
2. Choose to create a new account
3. Save your 12-word mnemonic phrase securely and offline
4. Verify the requested recovery words
5. Choose your 12-character WAX account name
6. Create a passkey on your device or phone
7. Pay the **5 WAX** account creation fee when prompted

After that, you can use the account in My Cloud Wallet. For the full wallet guide, see [My Cloud Wallet](/learn/getting-started/mycloudwallet/).

### Anchor Account Creator

Greymass provides a paid account creator at [create.anchor.link](https://create.anchor.link). It can create a WAX account for you or for someone else, using a public key you control.

**Fee:** $0.99 USD.

::: danger Download Anchor only from official sources
The only official Anchor download locations are [anchorwallet.io](https://anchorwallet.io), [greymass.com/anchor](https://greymass.com/anchor), and the [Greymass GitHub repository](https://github.com/greymass/anchor). **anchorwallet.org is fake.** Do not download Anchor from that site or from any other unofficial page, ad, or search result.
:::

1. Download and install Anchor from one of the official links above
2. Generate a key pair in Anchor and store the keys in the wallet. See [Generate Keys in Anchor](/learn/getting-started/anchor/importing-accounts#generate-keys-in-anchor-then-detect-the-account)
3. Copy the **public** key. Never paste a private key into a website or memo
4. Open [create.anchor.link](https://create.anchor.link) and select **WAX**
5. Enter the account name you want and the public key that should control it
6. Pay the **$0.99 USD** fee to create the account
7. Import the new account into Anchor. See [Importing Accounts into Anchor Wallet](/learn/getting-started/anchor/importing-accounts)

### Create by Transfer

If you already hold WAX on an exchange or another WAX account, you can create a self-custodied account by sending WAX to `signupwaxwax`.

**Memo format:** `[accountname]-[pubkey]`

Example:

```txt
mywaxaccount-EOS8xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

::: info Use the legacy public key format
The memo must use the legacy `EOS...` public key, not `PUB_K1_...`. Use the public key for the key pair you will import.
:::

1. Generate a key pair first, then copy the **public** key. You can do this in Anchor. See [Generate Keys in Anchor](/learn/getting-started/anchor/importing-accounts#generate-keys-in-anchor-then-detect-the-account)
2. Choose an unused 12-character account name using only `a-z` and `1-5`
3. Send WAX to the `signupwaxwax` account
4. Set the memo to `[accountname]-[pubkey]` with no spaces around the dash
5. After the account exists on-chain, import it into [Anchor](/learn/getting-started/anchor/) or another self-custody wallet

The transfer pays for creating the account and funding its initial resources. Extra WAX is typically used to buy RAM for the new account.

::: warning Check the memo before you send
Use the public key only. Never put a private key in a memo. If the exchange cannot attach a memo, do not use this method from that withdrawal. A wrong name, wrong key, or missing memo can create the wrong account or send funds you cannot recover.
:::

## After You Create an Account

- Review [Security and Recovery](/learn/getting-started/security-and-recovery)
- If you used My Cloud Wallet, continue to [My Cloud Wallet](/learn/getting-started/mycloudwallet/)
- If you used Anchor or `signupwaxwax`, continue to [Importing Accounts into Anchor Wallet](/learn/getting-started/anchor/importing-accounts)
- Then [get WAXP and fund the account](/learn/getting-started/get-waxp-and-fund-account) if you still need tokens for apps and resources
