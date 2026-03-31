---
title: Claim My Cloud Wallet Account
description: Learn the difference between soft claim and hard claim, generate keys, and import a hard-claimed account into Anchor.
---

# Claim My Cloud Wallet Account

By default, My Cloud Wallet manages the keys for your account. That custodial setup makes onboarding easier, but it also means you do not directly control the account keys unless you claim them.

## Advantages

- My Cloud Wallet removes the need for new users to store and manage private keys themselves.
- It makes sign-in easier because access is tied to the login method used to create the wallet.

## Inconveniences

- Account access is limited to My Cloud Wallet's own tools and flows.
- If the custodial service were ever compromised, managed keys could be exposed.

For many users, My Cloud Wallet is enough on its own. If you want direct control of the account keys, you can claim the account partially or fully.

## Basic Permissions

The two core permissions on a WAX account are **Owner** and **Active**.

- **Owner**: Authorizes account ownership operations, such as changing keys for any other permissions or creating new permissions. Owner keys should not be used for everyday third-party app access.
- **Active**: Handles normal day-to-day blockchain operations.

Additional custom permissions can also exist on an account, each with its own key pair and restricted scope.

## Prepare Anchor Before You Claim

If you plan to use Anchor after a **Soft Claim** or **Hard Claim**, generating the keys in Anchor is the primary workflow. This lets you save the keys in the wallet first, use those public keys during the claim, and then import the account after the keys are assigned on-chain.

1. Open Anchor **Settings** from the top-right gear icon and enable **Display advanced options**.

![Anchor settings with Advanced User Options opened](/assets/images/anchor/import/6.1.png)

![Anchor settings with Display advanced options enabled](/assets/images/anchor/import/6.2.png)

2. Open **Tools** in Anchor.

![Anchor Tools home screen](/assets/images/anchor/import/6.4.png)

3. Open **Manage Keys**. You can either import an existing key or generate fresh keys in Anchor. For a new Soft Claim or Hard Claim, generating new keys is the usual path.

![Anchor Key Management screen with Generate Key Pairs and Import Key options](/assets/images/anchor/import/6.5.png)

4. Select **Generate Key Pair (x2)** to create two key pairs, one for **Owner** and one for **Active**.

![Generate Key Pairs dialog before keys are created](/assets/images/anchor/import/6.6.png)

5. After the keys appear, save them to the wallet.

![Generated key pairs shown before saving](/assets/images/anchor/import/6.7.png)

6. Enter your Anchor password to authorize the save.

![Anchor authorization dialog for saving generated keys](/assets/images/anchor/import/6.8.png)

7. Confirm that the keys were saved successfully.

![Generated key pairs saved successfully](/assets/images/anchor/import/6.9.png)

8. Back in **Key Management**, confirm the public keys are listed. You can copy the keys from here to use in the claim form.

![Key Management screen showing saved public keys](/assets/images/anchor/import/6.10.png)

## Secondary Option: Generate Keys with the WAX Explorer

If you do not want to generate the keys inside Anchor, you can use the official WAX explorer at [waxblock.io](https://waxblock.io/).

![WAX Blockchain Explorer](/assets/images/claim-account-1.png)

1. Navigate to **Wallet** (1), then **Utilities** (2).
2. Click **Generate new keys** (3).
3. Copy the public key (4) and private key (5) for the first permission, **Owner**.
4. Repeat the process to create another key pair for **Active**.
5. Store all four keys safely and clearly label which pair belongs to **Owner** and which belongs to **Active**.

## Change the Public Key Format

The WAX explorer uses the modern public key format, but My Cloud Wallet's claim form expects the older public key format beginning with `EOS...`.

![WAX Blockchain Explorer Key Format](/assets/images/claim-account-2.png)

1. In the same **Wallet > Utilities** area, open **Format Keys**.
2. Paste each generated public key into the formatter.
3. Convert the public key to the legacy format.
4. Copy the output key that begins with `EOS...`

You do not need to convert the private keys.

## Claim Your Account from My Cloud Wallet

Once your keys are ready, proceed with the claim flow in My Cloud Wallet.

![My Cloud Wallet Account Claiming](/assets/images/claim-account-3.png)

1. Visit [My Cloud Wallet](https://www.mycloudwallet.com) and sign in.
2. Open **Settings** (1), then **Account Claiming** (2).
3. Choose one of the two account claim options.

- **Soft Claim** (3): Keeps the account linked to My Cloud Wallet while adding your own keys.
- **Hard Claim** (4): Fully disconnects the account from My Cloud Wallet custody and moves control to your own keys. After this, you will need another wallet such as Anchor or Wombat to use the account.

### Soft Claim

1. Enter the public keys for **Owner** (1) and **Active** (2). These should begin with `EOS` or `PUB_`
2. Carefully verify the keys before continuing.
3. Select the compliance checkbox (3) and sign the transaction to begin the claim.

![My Cloud Wallet Soft Claim Process](/assets/images/claim-account-4.png)

My Cloud Wallet then sends a security code by email.

1. Enter the emailed numerical code (1).
2. Click **Next** (2).
3. Wait for the claim process to complete.

### Hard Claim

Soft Claim keeps the My Cloud Wallet multisig model in place. That means you may still be able to log in with My Cloud Wallet, but external wallets will not have full standalone signing control.

Hard Claim removes the multisig setup and fully transfers control of the account to your own keys. After a Hard Claim, you will no longer use My Cloud Wallet as the controlling wallet for that account. You will need a third-party wallet such as Anchor or Wombat.

The claim form itself is the same as Soft Claim. The difference is the option you choose and the final custody result.

## Import the claimed Account into Anchor

After the claim completes, return to Anchor and import the claimed account using the keys already saved in the wallet.

1. Open the WAX account setup flow in Anchor. With advanced options enabled, Anchor shows an **Automatically Detect** tab next to **Existing Account**.

![WAX setup page showing the Automatically Detect tab](/assets/images/anchor/import/6.3.png)

2. Open **Automatically Detect**. Anchor scans WAX for accounts that match the keys stored in the wallet. Select the account permission you want to import, then choose **Import Account(s)**.

![Automatically Detect screen showing matching WAX account permissions](/assets/images/anchor/import/6.11.png)

![Automatically Detect results with importable accounts selected](/assets/images/anchor/import/6.12.png)

3. Enter your Anchor password to authorize the import.

![Anchor authorization dialog for automatic account detection import](/assets/images/anchor/import/6.13.png)

This is the cleanest Anchor flow when you generate the claim keys in Anchor first. If you created the keys elsewhere, you can still import them into Anchor manually from **Tools > Manage Keys**.

## Notes

- **Soft Claim** keeps the My Cloud Wallet relationship in place, so some signing behavior still depends on the My Cloud Wallet multisig setup.
- **Hard Claim** fully transfers control to your own keys. Back up the Owner and Active private keys before finishing the claim.
- If you lose the private keys used for Hard Claim, My Cloud Wallet cannot recover the account for you.
- For more help using Anchor, see [Anchor Wallet](/learn/getting-started/anchor/) and [Importing Accounts into Anchor Wallet](/learn/getting-started/anchor/importing-accounts).
