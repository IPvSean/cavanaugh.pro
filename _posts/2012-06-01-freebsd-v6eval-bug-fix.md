---
layout: post
title: "FreeBSD 9.0 v6eval Compile Bug Fix"
date: 2012-06-01
tags: [freebsd, ipv6, bug-fix]
---

Last week I was upgrading one of our VMware templates to FreeBSD 9.0 to conduct ReadyLogo testing via the Tahi scripts and stumbled across a bug where I couldn't make v6eval compile correctly:

```
freebsd-9-USGv6# cd v6eval-3.3.2
freebsd-9-USGv6# make
===> lib (depend)
===> lib/Cm (depend)
CmMain.cc:51:18: error: utmp.h: No such file or directory
mkdep: compile failed
*** Error code 1
```

I sent out an email to Ed Schouten of the FreeBSD project (who is in charge of integrating the new `utmpx.h` now that `utmp.h` has been deprecated) and he was able to help me in less than an hour!

The fix: go to the directory of the v6eval port (`/usr/ports/net/v6eval`) and run:

```bash
fetch -o files/patch-utmpx http://80386.nl/pub/v6eval.txt
make clean
make install clean
```

If it still won't compile, try:

```bash
make TRYBROKEN= clean
make TRYBROKEN= install clean
```
