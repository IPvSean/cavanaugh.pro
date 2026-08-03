---
layout: post
title: "5 Host Network Configurations for MLAG"
date: 2017-06-15
tags: [cumulus, mlag, networking, linux]
external_url: https://cumulusnetworks.com/blog/5-host-network-configurations-mlag/
---

Host network configurations for MultiChassis Link Aggregation (MLAG, also referred to as dual-attach or 'high availability') can vary from host OS to host OS, even amongst Linux distributions. The most recommended and robust method is to use Link Aggregation Control Protocol (LACP), which is supported on most host operating systems natively. Host bonds or bonding refers to a variety of bonding methods, but for the purpose of this article it will refer to LACP bonds. The terms etherchannel, link aggregation group (LAG), NIC teaming, port-channel and bond can be used interchangeably to refer to LACP depending on the vendor's nomenclature.

[Read the full post on cumulusnetworks.com →](https://cumulusnetworks.com/blog/5-host-network-configurations-mlag/)
