---
title: Custom Permissions
---

# Custom Permissions

Custom permissions let you authorize specific actions without exposing broader account authority than necessary.

## Why Custom Permissions Are Important

They are one of the most effective ways to reduce operational risk on WAX.

Use them when you want to:

- isolate a narrow workflow
- grant limited authority to an app or script
- separate claim, automation, or contract-specific actions from general account control

## Common Patterns

### App Integration

Give an app or signer authority only for the actions it needs.

### Automation

Use a dedicated permission for scripts or services instead of relying on your main active workflow.

### Operational Separation

Keep higher-authority permissions protected while lower-risk tasks use narrower permissions.

## Design Rules

- keep the permission scope as small as possible
- document what actions it can sign
- avoid reusing a broad permission out of convenience
- review how the permission fits into your recovery and monitoring plan

## WAX References

- [WAX Account Custom Permissions](/operate/wax-infrastructure/wax-account-custom-permissions)
- [Permissions](/build/core-concepts/permissions)
