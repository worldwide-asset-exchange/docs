---
title: My Cloud Wallet Troubleshooting
description: Troubleshooting for My Cloud Wallet migration, passkeys, recovery, and Vault signing sessions.
---

# My Cloud Wallet Troubleshooting

This guide covers common issues with migration, passkeys, account recovery, and the Vault in My Cloud Wallet.

## Migration Problems

### I see an error when I start migration

Your account may already be migrated, or the email connected to the legacy wallet may already exist in the new wallet.

Try this:

1. Go to [mycloudwallet.com](https://www.mycloudwallet.com)
2. Try signing in directly to the new wallet
3. If needed, return to the legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com) and restart the migration flow from the migration banner

### My migration stopped or failed

If the process did not finish:

1. Sign back in to the legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com)
2. Open the migration banner again
3. Resume the migration flow
4. Re-approve any login or transaction prompts that appear

Your passkey and public key should update automatically when you restart the process.

### I do not know whether my account already migrated

If you sign in to the legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com) and the account has already been migrated, the wallet should offer a direct path to the new wallet. Use that option instead of trying to migrate again.

## Passkey Issues

### The passkey prompt is not appearing

This is often caused by device, browser, or password manager conflicts.

Try this:

- Use a current version of Chrome, Edge, Safari, or another passkey-compatible browser
- Disable competing password managers temporarily
- Retry passkey setup on the current device
- If needed, use the QR code option and create the passkey on your phone

### The wrong password manager appears

My Cloud Wallet recommends using:

- **Google Password Manager** on Windows or Android
- **iCloud Keychain** on macOS or iOS

If another password manager appears first, disable it temporarily and retry.

### I lost access to the device that holds my passkey

Use your 12-word mnemonic phrase to recover access and create a new passkey on another device.

This same recovery flow can also be used to add a second device before you lose access to the first one.

## Recovery Issues

### I did not save my 12-word mnemonic phrase

The mnemonic phrase is the wallet's main recovery method. Without it, device recovery may not be possible.

If you still have access to the wallet on an existing device, sign in there and review your recovery options before changing devices.

### I entered the mnemonic words and recovery is not working

Check the following carefully:

- The words are in the original order
- The spelling matches exactly
- There are no extra spaces
- You are using the phrase associated with that wallet

If one word is wrong or out of order, recovery will fail.

## Private Key Import Issues

### The wallet says my private key is invalid

Check that:

- You copied the complete private key
- There are no leading or trailing spaces
- You are using the exported key from the legacy wallet

If the key still fails, return to the legacy wallet and verify the exported key before retrying the import.

### I imported a private key and saw multiple accounts

That is expected when the same key is linked to more than one account or permission.

Review the list, select only the accounts you want, and continue. If you are unsure which account is your primary wallet, confirm the account name in the legacy wallet first.

## Verification Code Issues

### I did not receive the email OTP

Try this:

1. Wait a few minutes
2. Check spam or junk folders
3. Use the wallet's **Resend** option
4. Confirm you are checking the correct email account

### The wallet asks for both 2FA and email OTP

That is expected when 2FA is enabled on the legacy wallet. Enter both codes to continue.

## Vault Issues

### What is the Vault?

The Vault is a persistent signing session in the new wallet. After you unlock it, later signing requests can pass through the open Vault session without asking for a passkey every time.

### The Vault keeps asking me to confirm again

The Vault only stays active while its session remains open and unlocked. If the session closes, expires, or is locked again, you will need to confirm with your passkey again.

### I do not want to use the Vault

You can disable the Vault in wallet settings and return to confirming each transaction individually.

## Security Reminders

- Store your mnemonic phrase offline
- Back up any generated Owner and Active keys if you are shown them during migration
- Do not share your passkey, mnemonic phrase, or private keys
- Add a second recovery-ready device if you want stronger account resilience

## Still Stuck?

If the issue continues after retrying the relevant steps, collect the following before contacting support or community channels:

- Whether you are using the legacy wallet or the new wallet
- Your browser and operating system
- Whether the issue is related to passkeys, migration, OTP, recovery, or Vault
- The exact step where the flow failed
