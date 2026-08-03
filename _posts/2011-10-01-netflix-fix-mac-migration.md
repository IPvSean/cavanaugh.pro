---
layout: post
title: "Fixing Netflix After Mac Migration"
date: 2011-10-01
tags: [mac, netflix, troubleshooting]
---

Here is a problem I have come across twice now. Every time you migrate Apple computers it will corrupt a file so that Netflix will no longer work. So for me I migrated from a MacBook Pro to a Mac Mini then back to a MacBook Pro over a series of 3 years.

The file that gets corrupted is the `mspr.hds` file, located at:

```
HD > Library > Application Support > Microsoft > PlayReady > mspr.hds
```

Simply delete it and you are good to go. A lot of sites recommend you keep the old `mspr.hds` by renaming it something like `mspr.hds.old`, but I don't really see a reason for that — you can always reinstall Microsoft Silverlight.

For me the fix worked instantly. Remember that Netflix's help line is actually really easy to reach and will help you out.
