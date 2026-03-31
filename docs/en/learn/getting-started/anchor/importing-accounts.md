---
title: Importing Accounts into Anchor Wallet
description: Learn how to import your accounts into Anchor Wallet.
---

# Importing Accounts

This guide shows how to import an existing WAX account into Anchor Wallet Desktop using the WAX setup flow shown in the screenshots below.

## Before You Start

- Download and install Anchor from [Greymass](https://greymass.com/anchor)
- Have your WAX private key ready if you plan to use the direct import flow
- Keep your Anchor password stored safely offline, because Anchor cannot recover it for you

:::tip
If you already have an Anchor backup file, use **Import Anchor Backup File** on the first screen instead of the account import flow below.
:::

## Import an Existing WAX Account with a Private Key

1. Open Anchor and select **Setup an Account**.

![Anchor welcome screen with the Setup an Account button](/assets/images/anchor/import/1.png)

2. Create an Anchor password. This password protects the wallet data stored on your device.

![Anchor password setup screen](/assets/images/anchor/import/2.png)

3. Re-enter the same password and select **Set Password**.

![Anchor confirm password dialog](/assets/images/anchor/import/3.png)

4. When Anchor asks which blockchain you want to use, select **WAX**.

![Anchor blockchain selection screen with WAX selected](/assets/images/anchor/import/4.png)

5. On the WAX setup page, choose **Import an existing Account**.

![WAX setup page with Import an existing Account button](/assets/images/anchor/import/5.png)

6. Select **Import Private Key**. This page also shows separate options for Ledger devices and owner key certificates.

![Existing account import options in Anchor for private key, Ledger, and owner key certificate](/assets/images/anchor/import/7.1.png)

7. Paste your WAX private key. Anchor will look up matching accounts for that key. Select the account permission you want to import, then choose **Import Account(s)**.

![Private key import screen showing a matching WAX account](/assets/images/anchor/import/7.2.png)

8. Enter your Anchor password to authorize the import.

![Anchor authorization dialog during account import](/assets/images/anchor/import/7.3.png)

9. After the import finishes, Anchor adds the account to **Manage Wallets**. If needed, select **Use Wallet** to switch into it.

![Manage Wallets screen showing the imported WAX account](/assets/images/anchor/import/8.png)

10. Anchor then opens the account overview for your imported WAX account.

![Anchor account overview after importing a WAX account](/assets/images/anchor/import/9.png)

11. Create a backup of your wallet from the **Backup** button. After the backup succeeds, Anchor shows the backup status in the right sidebar.

![Anchor account overview showing a recent backup timestamp](/assets/images/anchor/import/10.png)

## Generate Keys in Anchor, Then Detect the Account

This flow shows how to generate new keys inside Anchor first. After the keys are created and saved, you must add those public keys to a WAX account before Anchor can detect anything. That can happen during a My Cloud Wallet claim process or through another account-management method.

1. Open **Settings** from the top-right gear icon and enable **Display advanced options**.

![Anchor settings with Advanced User Options opened](/assets/images/anchor/import/6.1.png)

![Anchor settings with Display advanced options enabled](/assets/images/anchor/import/6.2.png)

2. Return to the WAX setup screen. Anchor now shows an **Automatically Detect** tab next to **Existing Account**.

![WAX setup page showing the Automatically Detect tab](/assets/images/anchor/import/6.3.png)

3. Open **Tools**, then select **Manage Keys**.

![Anchor Tools home screen with Manage Keys available](/assets/images/anchor/import/6.4.png)

4. In **Key Management**, add the key pair you want Anchor to use. If you already have a key, use **Import Key**. The screenshots below show the flow for generating and saving a new key pair inside Anchor.

![Anchor Key Management screen with Generate Key Pairs and Import Key options](/assets/images/anchor/import/6.5.png)

5. Select **Generate Key Pair (x2)** to create a key pair in the example flow.

![Generate Key Pairs dialog before keys are created](/assets/images/anchor/import/6.6.png)

6. After the keys appear, save them to the wallet.

![Generated key pairs shown before saving](/assets/images/anchor/import/6.7.png)

7. Enter your Anchor password to authorize saving the keys.

![Anchor authorization dialog for saving generated keys](/assets/images/anchor/import/6.8.png)

8. Confirm the keys are saved, then close the dialog.

![Generated key pairs saved successfully](/assets/images/anchor/import/6.9.png)

9. Back in **Key Management**, confirm the key pair is listed.

![Key Management screen showing saved public keys](/assets/images/anchor/import/6.10.png)

10. Before continuing, add the generated public key or keys to the account you want to import. For example, you can use these keys during a My Cloud Wallet claim, or assign them manually on an account you already control.

11. After those keys are attached to the target account on WAX, go back to the WAX setup flow and open **Automatically Detect**. Anchor scans for accounts that match the keys stored in the wallet. Select the account permission you want to import, then choose **Import Account(s)**.

![Automatically Detect screen showing matching WAX account permissions](/assets/images/anchor/import/6.11.png)

![Automatically Detect results with importable accounts selected](/assets/images/anchor/import/6.12.png)

12. Enter your Anchor password to finish the import.

![Anchor authorization dialog for automatic account detection import](/assets/images/anchor/import/6.13.png)

## Need Help?

If Anchor does not find your account, your key may not match the permission on that account, or you may be using the wrong key format. For official support, visit the [Greymass Support Portal](https://support.greymass.com/support/home).
