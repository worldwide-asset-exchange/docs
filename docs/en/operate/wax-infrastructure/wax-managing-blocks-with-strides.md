The WAX Protocol Network is always growing.. it is constantly increasing it’s users, launching fresh games, adding snappy dApps and trading millions of NFT’s.

For the WAX blockchain, this means more data,  **lots more  _(_**_The current blocks.log at time of writing is_ **_4.2TB)_** .. and all this data has do be stored immutably and publicly, as well as effectively archived so that it may be inspected, queried or replayed all the way back to the genesis block start of the network.

Thankfully WAX Software has tools that can assist Top Tier Guilds with managing this large amount of data by breaking up the monolithic blockchain  **blocks.log** into manageable chunks by configuring a  **blocks-log-stride**.

This guide will cover the explanation and configuration details of configuring a blocks-log-stride in nodeos to better manage the growing blocks.log data.

## Managing WAX Blocks Data with Strides

The  **/blocks**  folder contains the  `blocks.log`  file, which is a local copy of all immutable blocks of the WAX chain stored on the node. It also contains a  `blocks.index`  file, which is an index of the  `blocks.log`  file used to find the location of a specific block number quickly.

Typically the  `blocks.log`  and  `blocks.index`  files continue to grow as monolithic files which can be extremely hard to handle, especially when it comes to backing up as it means archiving TB’s of data multiple times. If you use archive compression, deduplication will be ineffective.

Configuring  `blocks-log-stride`  will break the  `blocks.log`  and  `blocks.index`  up into smaller files as the blockchain reaches a configured block milestone or stride. Below is the CLI help detail.

`blocks-log-stride =`

_Split the block log file when the head block number is the multiple of the stride.  
When the stride is reached, the current block log and index will be renamed `<blocks-retained-dir>/blocks-<start num>-<end num>.log/index`  
and a new current block log and index will be created with the most recent block. All files following this format will be used to construct an extended block log._

Below is an example of a Full WAX Mainnet Node that was configured at around block 275,000,000 to use a stride of 1,000,000 blocks. As the blockchain progresses at each 1,000,000 block milestone a new stride  `.index`  and  `.log`  will be created. Take note that the next stride always starts off in the normal  `blocks.log`  and  `blocks.index`  format.

![image](https://github.com/user-attachments/assets/c9623d53-35ed-4890-96c7-242f5fc27772)

This makes backup of the blocks data simple, as past data is immutable meaning only the latest stride needs to be archived approximately each fortnight.

It also makes it simple to fix corrupted data as only what is required needs to be recovered on the node.

## Configuration

Configuration is quite simple, EOSphere have standardised on a stride of 1,000,000 blocks making it modular enough for us to manage.

```
> nano config.ini  
  
blocks-log-stride = 1000000
```

## **Other Configuration**

There are three other settings that may be configured to aid in your  `block.log`  management, mainly managing older data. Details below taken from the CLI help.

`blocks-archive-dir =`  
_The location of the blocks archive directory (absolute path or relative to blocks dir). If the value is empty, blocks files beyond the retained limit will be deleted. All files in the archive directory are completely under user’s control, i.e. they won’t be accessed by nodeos anymore._

`max-retained-block-files =`  
_The maximum number of blocks files to retain so that the blocks in those files can be queried. When the number is reached, the oldest block file would be moved to archive dir or deleted if the archive dir is empty._

`blocks-retained-dir =`  
_The location of the blocks retained directory (absolute path or relative to blocks dir). If the value is empty, it is set to the value of blocks dir._  **_This may provide a useful option to store older data on different disks or even a network share._**

## Points to Note

If a stride is not configured  `nodeos`  will only be looking for the normal  `blocks.log`  and  `blocks.index`.

`leap-util`  is only able to query  `blocks.log`  and  `blocks.index`

It is possible to rename the stride  `.log`  and  `.index`  files as  `blocks.log`  and  `blocks.index`  to query with  `leap-util`  or start  `nodeos`  without a stride configured.

---

These **WAX Developer Technical Guides** are created using source material from the [EOSphere WAX Technical How To Series](https://medium.com/eosphere/wax-technical-how-to/home)

Be sure to ask any questions in the  [EOSphere Telegram](https://t.me/eosphere_io)
