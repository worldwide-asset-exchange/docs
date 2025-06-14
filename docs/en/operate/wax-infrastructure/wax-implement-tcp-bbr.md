Top tier WAX Guilds provide services to the WAX ecosystem across the entire globe. Millions of daily user interactions are taking place, these users run their clients on a multitude of internetworks of varying speed and reliability.

As a provider of WAX services, Guilds need to ensure that all users regardless of their location experience a slick interaction with the diverse WAX ecosystem.

Recently we have been experimenting with improving the user experience when interacting with WAX services over latent and packet loss prone networks.

This led us to investigate  **TCP Congestion Control Algorithms**  which are methods used by TCP to regulate the data transmission in networks. They manage the data flow between sender and receiver by dynamically adjusting the rate based on network conditions.

The default TCP congestion control algorithm in Ubuntu is  **TCP Cubic,** which is known as  **loss-based**  and uses packet loss as a signal to slow down transmission. This may be suboptimal for high loss unreliable links.

An alternative is using  **TCP BBR**  (Bottleneck Bandwidth and Round Trip propagation time) which instead of relying on packet loss as an indicator of congestion, measures the available bandwidth and round-trip time of the network path, by estimating these metrics more accurately, TCP BBR can maximise throughput and reduce latency.

This guide will cover the configuration of TCP BBR on Ubuntu Linux.

# Implement TCP BBR Congestion Control

TCP BBR is a congestion control algorithm developed by Google to enhance TCP (Transmission Control Protocol) connection performance across the internet. You can read more about it’s deployment in  [Google Cloud](https://cloud.google.com/blog/products/networking/tcp-bbr-congestion-control-comes-to-gcp-your-internet-just-got-faster).

It’s different from traditional legacy TCP congestion control algorithms like Reno or CUBIC by instead focusing on estimations of available network bandwidth and round-trip time (RTT).

Benefits of TCP BBR:

-   **Bandwidth Estimation:**  BBR continually measures the maximum available bandwidth by observing packet acknowledgments, allowing it to dynamically adjust its sending rate based on changes in available bandwidth.
-   **Round-trip Time Consideration:**  Alongside bandwidth estimation, BBR takes into account the round-trip time (RTT) of packets, adjusting the sending rate based on both bandwidth and latency.
-   **Effective Congestion Control:**  Unlike algorithms that primarily react to packet loss as a sign of congestion, BBR aims to maintain optimal throughput by probing bandwidth and RTT, striving for high utilisation without causing excessive queuing or delays.
-   **Latency Reduction:**  BBR’s design prioritises reducing latency by optimising the sending rate according to observed RTT, leading to quicker data transmission.
-   **Performance in Challenging Conditions:**  It excels in scenarios involving high-speed or long-distance connections where traditional TCP algorithms might struggle to fully utilise available bandwidth.

It’s important to be aware that switching to TCP BBR may not work in every scenario and results may vary. The EOSphere team are still experimenting with switching from CUBIC to TCP BBR and have had some success with it’s implementation.

***You should test before deploying into production***

# Configuration

This configuration has been tested with Ubuntu 22.04 (LTS) details below:

Ensure your Linux Kernal is 4.9+

```
> uname -r  

5.15.0-91-generic
```

Check your current setting

```
> sysctl net.ipv4.tcp_congestion_control  

net.ipv4.tcp_congestion_control = cubic
```

Edit  `sysctl.conf`  and add the following

```
> sudo nano /etc/sysctl.conf  
  
net.core.default_qdisc=fq  
net.ipv4.tcp_congestion_control=bbr
```

Reload  `sysctl`  settings

```
> sudo sysctl -p  
  
net.core.default_qdisc = fq  
net.ipv4.tcp_congestion_control = bbr
```

Check your new setting

```
> sysctl net.ipv4.tcp_congestion_control  
net.ipv4.tcp_congestion_control = bbr
```

You have now successfully switched to TCP BBR and hopefully user experience has substantially improved. Please let us know in the comments if you have made the switch and what your results were like.

---

These **WAX Developer Technical Guides** are created using source material from the [EOSphere WAX Technical How To Series](https://medium.com/eosphere/wax-technical-how-to/home)

Be sure to ask any questions in the  [EOSphere Telegram](https://t.me/eosphere_io)
