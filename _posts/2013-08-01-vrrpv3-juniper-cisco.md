---
layout: post
title: "VRRPv3 Between Juniper MX480 and Cisco 6509-E"
date: 2013-08-01
tags: [cisco, juniper, vrrp, ipv6, networking]
---

Ran into a problem the other day where I was trying to configure VRRPv3 (which supports IPv6) between a Juniper MX480 and a Cisco 6509-E w/ SUP2T. The only config guide I could find for the Cisco device did not go into any detail for the actual IPv6 implementation! I already pinged the appropriate people but I thought I would share my config below in the meantime.

The main thing to note is that when configuring IPv6 w/ VRRPv3 you have to manually add the link locals (as of 15.1.1 ~Nov 18th, 2012).

Remember you need this command on the Cisco:

```
fhrp version vrrp v3
```

Here is the Cisco config:

```
interface Vlan2100
 ip address 201.13.110.2 255.255.254.0
 ipv6 address 2201:13:110::2/64
 ipv6 enable
 vrrp 1 address-family ipv4
  priority 120
  address 201.13.110.1 primary
 exit-vrrp
 vrrp 1 address-family ipv6
  priority 120
  address FE80::13:110:1 primary
  address 2201:13:110::1/64
 exit-vrrp
end
```

And here is the Juniper config:

```
irb {
    unit 2100 {
        description "Voice Vlan";
        family inet {
            address 201.13.110.3/23 {
                vrrp-group 1 {
                    virtual-address 201.13.110.1;
                    accept-data;
                }
            }
        }
        family inet6 {
            address 2201:13:110::3/64 {
                vrrp-inet6-group 1 {
                    virtual-inet6-address 2201:13:110::1;
                    virtual-link-local-address fe80::13:110:1;
                    accept-data;
                }
            }
        }
    }
}
```

This config worked perfectly, and although it looks simple now it was pretty annoying to figure out that the routers were not smart enough to sync on their link-local if they have the same virtual global or vice versa. Hopefully this will help someone out there!
