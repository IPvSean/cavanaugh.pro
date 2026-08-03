---
layout: post
title: "Adding Line Numbers to VI/Vim"
date: 2011-12-01
tags: [vim, linux, tutorial]
---

VI is a handy tool to use because it is installed on every single non-Windows box I have ever seen. I originally only used nano and I have found out that nano is not everywhere.

1. Locate your `.vimrc` file. On OS X: `locate vimrc`
2. Open it with `vi /usr/share/vim/vimrc`
3. Add the line `set number` to the end of the file

Here is how my file looks:

```vim
" Configuration file for vim
set modelines=0         " CVE-2007-2438

" Normally we use vim-extensions
set nocompatible        " Use Vim defaults instead of 100% vi compatibility
set backspace=2         " more powerful backspacing

" Don't write backup file if vim is being called by "crontab -e"
au BufWrite /private/tmp/crontab.* set nowritebackup
" Don't write backup file if vim is being called by "chpass"
au BufWrite /private/etc/pw.* set nowritebackup

set number
```

Now every time you open vi it will show line numbers. To turn them off you can do `:set nonumber`.
