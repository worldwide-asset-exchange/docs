---
title: Docker Setup
order: 21
---

# Docker Setup

[Docker](https://www.docker.com/) is a container platform that's similar to a virtual machine. Docker allows you to run software, applications, and even operating systems like Ubuntu from an isolated environment. Refer to Docker's [Overview](https://www.docker.com/why-docker) guide to learn more.

Our development and production Docker images provide a fast, easy way to run the WAX Blockchain in minutes. You can also use our Docker images to build and deploy smart contracts.

Using our Docker environment offers the following benefits:

- Adds convenience and speed to your development efforts
- Eliminates the need to manage source code
- Eliminates the need to meet our [Supported Operating Systems](/build/tools/os) requirements
- Doesn't overwrite an existing installation of Leap
- Makes it easy to upgrade and try out new features
- Makes it easy to switch between production and development environments

## What's Included

Below is a list of our core Docker images. For a complete list, refer to [waxteam - Docker Repositories](https://hub.docker.com/u/waxteam).

| Docker Image | Description |
|--------------|-------------|
| [waxteam/waxnode-dev](https://hub.docker.com/r/waxteam/waxnode-dev) | This **development** image includes everything you need to get the WAX Blockchain up and running. You can use this image to run a WAX node, create a local development environment, and create and compile smart contracts using the [WAX Contract Development Toolkit (WAX-CDT)](/build/dapp-development/wax-cdt/). |
| [waxteam/cdt](https://hub.docker.com/r/waxteam/cdt) | Use this image to create and compile smart contracts using the [WAX Contract Development Toolkit (WAX-CDT)](/build/dapp-development/wax-cdt/). This image does **not** allow you to run a WAX node or use [Blockchain Tools](/build/tools/blockchain_tools). |
|[waxteam/waxdev](https://hub.docker.com/r/waxteam/waxdev)|This Docker image includes complied code of the WAX blockchain tools as well as the Smart Contract Development Toolkit.|
| [waxteam/waxnode](https://hub.docker.com/r/waxteam/waxnode) | It's recommended that you use our [production docker images](https://hub.docker.com/r/waxteam/waxnode) to run a production node. Refer to [Running a WAX node](https://github.com/worldwide-asset-exchange/wax-blockchain/tree/main/samples/mainnet) for more information. |

<ChildTableOfContents :max="2" title="More inside this section" />