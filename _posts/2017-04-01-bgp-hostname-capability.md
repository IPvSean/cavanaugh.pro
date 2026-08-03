---
layout: post
title: "BGP Hostname Capability"
date: 2017-04-01
tags: [bgp, networking, cumulus, troubleshooting]
featured: true
---

I really like Daniel Walton's [draft-walton-bgp-hostname-capability-00](https://tools.ietf.org/html/draft-walton-bgp-hostname-capability-00). Cumulus Networks implemented this as part of Quagga/FRR and it has become the default on Cumulus Linux 3.0 and later. BGP is one of those protocols that is really powerful but in the past is really a pain in the ass to troubleshoot if you don't know how things are cabled. Without a network map or diagram it will take awhile to reverse engineer and troubleshoot a customer's network.

This capability allows the configured BGP neighbor hostname to be shared via BGP (not LLDP or CDP) so it can give you the output with the BGP commands themselves without having to correlate a neighbor to IP address, and IP address to physical switchport. What does that look like?

```
cumulus@leaf01:mgmt-vrf:~$ net show bgp sum

show bgp ipv4 unicast summary
=============================
BGP router identifier 10.0.0.11, local AS number 65011 vrf-id 0
BGP table version 107
RIB entries 25, using 3400 bytes of memory
Peers 2, using 42 KiB of memory

Neighbor        V         AS MsgRcvd MsgSent   TblVer  InQ OutQ  Up/Down State/PfxRcd
spine01(swp51)  4      65020  286176  286211        0    0    0 01w2d22h           11
spine02(swp52)  4      65020  224758  224766        0    0    0 4d18h12m           11
```

Wow… that is beautiful. Now I know my two uplinks (switchport 51 and switchport 52) are hooked up to spine01 and spine02. The output without this default (`no bgp default show-hostname`) looks like this:

```
Neighbor        V         AS MsgRcvd MsgSent   TblVer  InQ OutQ  Up/Down State/PfxRcd
swp51           4      65020  286341  286376        0    0    0 01w2d22h           11
swp52           4      65020  224923  224931        0    0    0 4d18h21m           11
```

I use this for every customer network I work on (which is easy now that it is the default). I hope more and more vendors implement this capability because it is very slick.
