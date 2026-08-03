---
layout: post
title: "Learning and Testing Ansible Playbooks with Virtual Images"
date: 2018-04-11
tags: [ansible, networking, virtual-labs, cisco, arista, cumulus, juniper]
featured: true
---

One of the common problems I see with network automation in general is that no one wants to learn and test their automation software on production network gear. While lots of people have labs they can play with network gear that obviously is not an option for everyone. Even used equipment can cost a thousand dollars or more, and in my case my spouse was not super excited about our power bill rising by $100 a month while I ran some Cisco switches in my office.

I am not saying that owning networking hardware is a bad idea, its just not exactly scalable, and doesn't work for everyone's situation. Imagine the network engineer living in New York City in the super small apartment. I was lucky enough while studying for my CCIE to have access to a lab at work where I had all the equipment I needed to play with, and didn't have to deal with the heat, noise and power bills. I was a Cisco employee at the time so I also had access to virtual Cisco images.

Luckily networking vendors (including Cisco) are finally realizing that these virtual images are super important for education and control plane testing. While we can't replace line-rate hardware with virtual images, we can test configurations, bring up routing protocols, test connectivity. Of course testing Ansible Networking Playbooks is perfect for a virtual environment. The worst thing about automation is I can automate a mistake across hundreds of nodes at the same time.

## Arista

Arista has a common NOS (network operating system) amongst their hardware called EOS (Extensible Operating System). If you create a free account on their website, they will allow you to download a virtual EOS (vEOS) for free. The only limitation with this free VM is the amount of ports (I think by default it is limited to 4). For the testing I was doing it worked great on my laptop.

## Cisco

Cisco Systems has three main platforms that I use: Cisco IOS, Cisco NX-OS and Cisco IOS-XR. All three of them have virtual images, but they require entitlement on your account. From what I have seen, if you own the physical gear you automatically can get the virtual image. Another option is using Cisco VIRL.

I wrote a Knowledge Base article for Red Hat Ansible Engine: [Getting Cisco NX-OSv up and running](https://access.redhat.com/articles/3199502). This is a super simple guide on just getting Cisco NX-OSv up and running on your laptop.

## Cumulus Networks

For Cumulus Linux they have a free version called Cumulus VX (for virtual experience). Unlike Arista, there is no port limitation, so you can add as many ports as you want (depending on the underlying platform, e.g. VirtualBox vs KVM).

Another cool tool that Cumulus Networks provides for free is called topology converter. This python script creates a virtual topology (using Vagrant) from a network map (in the form of dot notation). This allows users of Cumulus Linux (or really any Linux operating system) to build complex topologies. While I was working at Cumulus Networks I could run well over a hundred Cumulus VX instances on a single server.

## Juniper

Juniper Networks has a few different virtual images floating around, including vSRX and vQFX. They have published a Vagrant image that is not behind a login wall or paywall: [vqfx10k-vagrant](https://github.com/Juniper/vqfx10k-vagrant)

## VyOS

VyOS is an open source fork of Vyatta routing software. While VyOS might be one of the networking platforms on here you have never heard of, many people use VyOS in production as a vRouter. Their use-case is often peering to a service provider where they already have limited bandwidth out of the data center, so not having 100Gbps line-rate is not a problem. Check out their website: [vyos.io](https://vyos.io/)

## Summary

While I am sure many other networking platforms are out there (e.g. F5 Networks) these are some of the ones I play with the most. I am super excited about all the virtual networks people are creating, because it means that network operators can test network changes on a virtual topology versus messing up their production network. I am sure we will see people implement really interesting CI/CD pipelines in the future, where they can automate changes into their virtual development environment before touching any production equipment.
