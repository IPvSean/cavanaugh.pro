---
layout: post
title: "Complete Wireshark Installation Guide for Mac"
date: 2012-01-01
tags: [wireshark, mac, networking, tutorial]
---

Here is the complete guide, because so many 'complete guides' were missing a step or two that I needed.

1. Download the DMG from [wireshark.org](http://www.wireshark.org/download.html). Unpack it.
2. Drag the Wireshark icon onto the Applications alias.
3. Open the Utilities folder.
4. Drag the contents of the Command Line folder to `/usr/local/bin`.
5. Drag the ChmodBPF folder onto the StartupItems alias (path is `/Library/StartupItems/ChmodBPF`).
6. If you're running as an admin user you will see a list of network interfaces in Wireshark. If you don't see any, you're probably running as a non-admin. You need to allow read access to `/dev/bpf*`. A quick test: `sudo chmod o+r /dev/bpf*`. A better solution is adding a `chown` line to the ChmodBPF script.
7. For fresh installs on Snow Leopard, fix ownership: `cd /Library/StartupItems && sudo chown -R root:wheel ChmodBPF`
8. Check security settings — if you see "Insecure Startup Items folder detected", fix permissions:

```bash
sudo chown -R root:wheel /Library/StartupItems
sudo chmod -R 0755 /Library/StartupItems
```

If you see an `@` symbol in `ls -l@`, remove the quarantine:

```bash
xattr -r -d com.apple.quarantine /Library/StartupItems/ChmodBPF
```

9. Restart your computer, make sure there are no errors, and verify you can see interfaces to capture from.
