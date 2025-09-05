---
title: Relink a claimed account to My Cloud Wallet
---

# Relink a claimed account to My Cloud Wallet

When we log in to the My Cloud Wallet site using the login method we had assigned (Gmail account, for example), we will see that our WAX account no longer appears but, instead, we have a link that says "Link Blockchain Account" that will allow us to associate a WAX account with My Cloud Wallet.

![My Cloud Wallet Link Blockchain Account](/assets/images/relink-account-1.png)

As we see, the system remembers our old account and tells us that you can only recover that account, that is; We will not be able to link a different account than the one we had.

As an identification method, it offers us to login with Anchor, since it will be necessary to sign a transaction that will reactivate the multisignature. We must have linked our My Cloud Wallet account with Anchor before starting this process.

:::warning IMPORTANT! 
We are going to perform an authorization at the account ownership level to allow My Cloud Wallet to sign for us (multisignature). To authorize this operation it is necessary to use the Owner permission so we must import our account with the Owner key into Anchor. Once the process is complete, it is advisable to clear the Owned permission from Anchor to avoid future problems. Deleting an account in Anchor (or any wallet) does not affect the account itself; only to the possibility of continuing to use that wallet to log in or sign transactions. We can always relink the account thanks to the keys that we will always keep in good care.
:::

When you ask us to sign the transaction we will see the Anchor signature window similar to this:

![Anchor Signature](/assets/images/relink-account-2.png)

The first thing that catches our attention is the warning in red (1) that indicates the seriousness of this operation, since it involves giving permissions to a third party on our account thanks to the action "updateauth" (3). It is convenient to look at what is signed and make sure that we are sharing the "Active" signing permission with the "managed.wax" account, owned by My Cloud Wallet.

We make sure that we are going to sign the transaction with the Owned permission of our account (2) since, otherwise, an error will occur and the operation will be rejected.

We accept by clicking on the button (4) and we will see the following message:

![My Cloud Wallet Success Message](/assets/images/relink-account-3.png)

Our account has been linked again to My Cloud Wallet as if we were in the case of **Soft Claim**