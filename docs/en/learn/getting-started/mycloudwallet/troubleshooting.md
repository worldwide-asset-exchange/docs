---
title: My Cloud Wallet Troubleshooting
description: Troubleshooting for My Cloud Wallet migration, passkeys, recovery, and Vault signing sessions.
---

# My Cloud Wallet Troubleshooting

This guide covers common issues with migration, passkeys, account recovery, and the Vault in My Cloud Wallet.

[[toc]]

## My Cloud Wallet Requirements

To complete the migration to the new passkey-based My Cloud Wallet we officially support the following:

<table>
  <thead>
    <tr>
      <th style="white-space: nowrap;">Device</th>
      <th>Browser</th>
      <th>Passkey store or manager</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2" style="white-space: nowrap;">Windows 10+</td>
      <td>Chrome</td>
      <td>Google Password Manager</td>
    </tr>
    <tr>
      <td>Chrome, Brave, Edge, Firefox</td>
      <td>1Password</td>
    </tr>
    <tr>
      <td rowspan="3" style="white-space: nowrap;">macOS 15+</td>
      <td>Chrome</td>
      <td>Google Password Manager</td>
    </tr>
    <tr>
      <td>Chrome, Brave, Safari</td>
      <td>1Password</td>
    </tr>
    <tr>
      <td>Chrome, Edge, Safari</td>
      <td>iCloud Keychain</td>
    </tr>
    <tr>
      <td rowspan="1" style="white-space: nowrap;">Linux</td>
      <td>Chrome or another compatible desktop browser</td>
      <td>Google Password Manager or iCloud Keychain on mobile via QR setup</td>
    </tr>
    <tr>
      <td rowspan="1" style="white-space: nowrap;">Android 15+</td>
      <td>Chrome, Brave</td>
      <td>Google Password Manager</td>
    </tr>
    <tr>
      <td rowspan="2" style="white-space: nowrap;">iOS 18+</td>
      <td>Chrome</td>
      <td>Google Password Manager</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>iCloud Keychain</td>
    </tr>
  </tbody>
</table>

---

- Windows Hello does not currently support PRF passkeys, though your browser or device may still invoke it during setup.
- Hardware keys such as YubiKey are not supported but are planned for future releases.
- Bitwarden is not currently supported.
- 1Password is supported on desktop but does not seem to work on mobile.
- Other password managers such as Dashlane, Proton Pass, NordPass, and LastPass are untested.

---

<div style="font-size: 0.65rem; line-height: 1.3;">
  <div>- <em>Chrome / Edge desktop version 128+</em></div>
  <div>- <em>Chrome Android version 130+</em></div>
  <div>- <em>Safari version 16+</em></div>
  <div>- <em>Firefox version 128+</em></div>
  <div>- <em>Brave version 1.69+</em></div>
</div>

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
2. Open the **Use the New My Cloud Wallet** migration flow again
3. Resume the migration steps
4. Re-approve any legacy-wallet prompts that appear

### I do not know whether my account already migrated

If you sign in to the legacy wallet at [legacy.mycloudwallet.com](https://legacy.mycloudwallet.com) and the account has already been migrated, the wallet should offer a direct path to the new wallet. Use that option instead of trying to migrate again.

## Passkey Issues

### The passkey prompt is not appearing

This is often caused by device, browser, or password manager conflicts.

Try this:

- Use a current version of Chrome, Safari, or another compatible browser for your operating system (see above for supported browsers)
- Disable competing password managers temporarily
- Retry passkey setup on the current device
- If needed, use the QR code option and create the passkey on your phone

If you are using **Chrome + Google Password Manager**, also check the following:

- You are signed in to your Chrome browser profile
- Password sync is enabled for that profile in `chrome://settings/syncSetup`
- **Offer to save passwords and passkeys** is enabled in `chrome://password-manager/settings`

### The wrong password manager appears

My Cloud Wallet recommends using:

- **Google Password Manager** on Windows or Android
- **iCloud Keychain** on macOS or iOS

If another password manager appears first, disable it temporarily and retry.

### I lost access to the device that holds my passkey

If you still have access on another trusted device, use **Settings > Devices > Add Device**.

If you no longer have access to any existing passkey device, use your 12-word mnemonic phrase to add a new passkey, use **Settings > Devices > Add device using mnemonic**.

## Recovery Issues

### I did not save my 12-word mnemonic phrase

The mnemonic phrase is the wallet's main recovery method. Without it, device recovery may not be possible.

If you still have access to the wallet on an existing device, sign in there and export the mnemonic from **Settings > Account Security > Export Mnemonic** before changing devices.

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
- You are trying to import a public key, not a private key.
  Private keys start with `5` or `PVT_`, public keys start with `EOS` or `PUB_`.

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

You can disable the Vault in **Settings > Account Security**. Doing so will require you to confirm your passkeys for each transaction.

## Security Reminders

- Store your mnemonic phrase offline
- Two copies stored in different locations is never a bad idea
- Treat the mnemonic phrase as your main recovery secret
- Do not share your passkey, mnemonic phrase, or private keys
- Add a second recovery-ready device if you want stronger account resilience

## Still Stuck?

If the issue continues after retrying the relevant steps, collect the following before contacting support or community channels:

- Whether you are using the legacy wallet or the new wallet
- Your browser and operating system
- Whether the issue is related to passkeys, migration, OTP, recovery, or Vault
- The exact step where the flow failed
