---
layout: post
title: "Layer2 Ports Not in a VLAN on Cumulus Linux"
date: 2017-03-15
tags: [cumulus, linux, networking, lldp]
---

Cumulus Linux has a cool 'feature' it inherited from Linux. On most network switches a port is either Layer2 or Layer3. When a port is layer2 it has to be part of a VLAN. Linux does understand and work with VLANs but it can have a port that is running at layer2 but not part of a VLAN. We can configure a port under `/etc/network/interfaces` like this:

```
auto swp1
iface swp1
```

If we ifup this port it's not part of a VLAN, and its not Layer3.

Why would we want to do this? Honestly the most common reason is that we can check physical connections by using LLDP before this port is part of a broadcast domain (VLAN) that could cause loops or unexpected behavior.

What if I cabled a switch and don't know what ports are connected? You could create a stanza for each swp like above, or do a simple bash loop on the command line:

```bash
for swp in {1..54}; do sudo ip link set swp$swp; done
```

Now all 54 ports are admin up at layer2 so we can check connections, but it's not routing or switching. Now you can use LLDP:

```
cumulus@leaf01:~$ net show lldp

Local Port    Speed    Mode                 Remote Port    Remote Host      Summary
------------  -------  -------------  ----  -------------  ---------------  --------------------------
eth0          1G       Mgmt           ====  swp23          oob-mgmt-switch  IP: 10.50.100.100/24(DHCP)
swp9          10G      NotConfigured  ====  swp51          leaf07
swp49         40G      NotConfigured  ====  swp49          exit02
swp50         40G      NotConfigured  ====  swp50          exit02
swp51         40G      NotConfigured  ====  swp30          spine01
swp52         40G      NotConfigured  ====  swp30          spine02
```

Yay now we can go configure them now that we know how they are cabled up. It's great to be lazy.

**Update 3/30/2017:** The famous Daniel Walton let me know that Cumulus Linux's new NCLU (Network Command Line Utility) also has a method of doing this quickly. NCLU uses the `net` command and has the ability to do a range of ports really quickly:

```
net add int swp1-54
```

One caveat vs using `ip link set`: this will make persistent config (meaning the ports are actually configured under `/etc/network/interfaces`).
