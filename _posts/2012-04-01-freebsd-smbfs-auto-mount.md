---
layout: post
title: "Auto-Mounting SMB Shares on FreeBSD"
date: 2012-04-01
tags: [freebsd, samba, sysadmin]
---

A problem at work the other day was every time our virtual machine cluster went down we had a bunch of virtual FreeBSD boxes that had to be manually connected one by one to our Windows share to offload reports. I wanted to make this happen automatically on boot since it was always the same Samba share.

**1)** Add a line to your fstab file located in `/etc/fstab`:

```
//USERNAME@SERVER/Mount_Folder /blah smbfs rw,noauto 0 0
```

**2)** Create a file called `.nsmbrc` located at `/root/.nsmbrc` and add your credentials:

```
[SERVER]
addr=x.x.x.x

[SERVER:USERNAME]
password=xxxx
```

**3)** Create a startup script. FreeBSD already has one available at `http://www.freebsd.org/cgi/cvsweb.cgi/src/contrib/smbfs/examples/smbfs.sh.sample`. This file simply parses through your fstab and mounts each SMB entry. Put it in `/usr/local/etc/rc.d/` and give it executable permissions.

**4)** Reboot and you should be good to go!

**Notes:** Make sure the SERVER and USERNAME in the `.nsmbrc` and fstab file match exactly and are both capitalized. The username for Samba shares is not case-sensitive so just go ahead and capitalize it.
