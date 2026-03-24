---
title: Migrate to the New My Cloud Wallet
description: Step-by-step guide for migrating from the legacy WAX Cloud Wallet to the new passkey-based My Cloud Wallet.
---

# Migrate to the New My Cloud Wallet

This guide covers how to move from the legacy WAX Cloud Wallet to the new My Cloud Wallet experience that uses passkeys for sign-in and a 12-word mnemonic phrase for recovery.

## Before You Start

Before starting the migration:

- Make sure you can still sign in to your legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com)
- Use a supported browser and device for passkeys
- Temporarily disable other password managers if they interfere with passkey prompts
- Be ready to save recovery information securely before continuing

Go to [mycloudwallet.com](https://www.mycloudwallet.com) and select **Migrate your account from legacy wallet**. The migration flow will send you to the legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com) to authenticate.

After signing in to the legacy wallet, you will see two paths:

- **Migrate account to new wallet**: Recommended for most users
- **Advanced account claiming**: For users who want direct control of their keys through Soft Claim or Hard Claim

For most users, choose **Migrate account to new wallet**.

## Step 1: Create Your Passkey

The new wallet uses a passkey instead of a password. Your passkey is protected by your device, such as Face ID, Touch ID, fingerprint, or PIN.

You can create the passkey in one of two ways:

- **Create passkey on this device**: Best if you want the passkey saved locally or through your device's supported password manager
- **Use phone with QR code**: Best if you want the passkey stored on your phone

If the browser shows the wrong password manager or the prompt fails, disable competing password managers and try again.

## Step 2: Choose Your Migration Path

After the passkey is set up, the wallet will ask how to migrate your account.

Choose the path that matches your situation:

- **Claim & Migrate**: Use this if you never exported your private key from the legacy wallet
- **Import account with private key**: Use this if you already exported your private key from the legacy wallet

## Path A: Claim and Migrate

This is the most common path for users coming from the legacy wallet.

### 1. Back Up Your 12-Word Mnemonic Phrase

The wallet will generate a 12-word mnemonic phrase. This is your master recovery phrase.

- Write it down in the correct order
- Store it offline in a secure place
- Do not save it in screenshots, notes apps, or cloud storage

Select **Next** after you have stored it securely.

### 2. Confirm the Mnemonic Phrase

You will be asked to enter 3 of the 12 words to confirm your backup.

- Enter each requested word in the correct numbered field
- The confirmation button stays disabled until all required words are correct

### 3. Save Your Owner and Active Keys

The migration flow also generates your blockchain keys:

- **Owner Key**
- **Active Key**

Back up both before continuing. These are separate from your mnemonic phrase and should also be stored securely.

### 4. Approve the Connection Request

A Cloud Wallet pop-up will appear asking you to approve a login request. Approve it so the new wallet can connect to your WAX account.

### 5. Approve the Migration Transaction

A second pop-up will appear for the on-chain migration transaction.

- Review the request
- Approve each transaction shown
- Some accounts may require two approvals

### 6. Complete OTP Verification

The wallet may ask for verification codes:

- If 2FA is not enabled, enter the email OTP
- If 2FA is enabled, enter both the 2FA code and the email OTP

If the email code does not arrive, use **Resend** and check your spam folder.

### 7. Wait for Migration to Finish

The wallet will show a migration progress screen, then redirect you to the new dashboard.

When complete, your account name, balances, and assets should appear in the new wallet.

## Path B: Import with a Private Key

Use this path only if you already exported your private key from the legacy wallet.

### 1. Enter Your Private Key

Paste your private key into the import form.

- If the key is valid, the confirmation button becomes available
- If the wallet says the key is invalid, re-check the key and try again

### 2. Select the Accounts to Import

The wallet will load all accounts associated with that key.

- Select the account or accounts you want to import
- Use **Select All** if needed
- Continue to the next step

### 3. Confirm the Import

Review the list of selected accounts and confirm the import. The wallet will migrate the selected accounts and redirect you to the new dashboard.

## After Migration

Once migration is complete, review the following:

- Confirm you can sign in with your passkey
- Confirm your account name and balances are visible
- Confirm your mnemonic phrase is stored safely offline
- Consider adding another device later using your mnemonic phrase

## Advanced Path: Soft Claim and Hard Claim

During migration, legacy users may also see advanced claiming options:

- **Soft Claim**: Keeps some My Cloud Wallet integration while giving you more key control
- **Hard Claim**: Transfers full key ownership to you and removes My Cloud Wallet custody

These options are meant for advanced users. If you are unsure, use the standard migration path instead.

## Common Migration Issues

- **Account already migrated**: Sign in directly at [mycloudwallet.com](https://www.mycloudwallet.com)
- **Email already exists in the new wallet**: Try signing in to the new wallet first instead of restarting migration
- **Passkey prompt does not appear**: Disable other password managers and retry
- **Migration fails partway through**: Sign back in to the legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com) and resume from the migration banner

For more issue-specific fixes, see [Troubleshooting](/learn/getting-started/mycloudwallet/troubleshooting).
