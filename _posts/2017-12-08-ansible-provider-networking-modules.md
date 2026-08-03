---
layout: post
title: "Ansible Provider for Networking Modules"
date: 2017-12-08
tags: [ansible, networking, troubleshooting]
---

While I know the provider argument is going to be eventually deprecated for networking modules for Ansible in favor of the new `connection: network_cli`, I often find myself troubleshooting playbooks running pre-Ansible 2.5. The message you can get can be super frustrating:

```
fatal: [eos]: FAILED! => {"changed": false, "failed": true, "msg": "unable to open shell. Please see: https://docs.ansible.com/ansible/network_debug_troubleshooting.html#unable-to-open-shell"}
```

But rest assured, the problem is probably easy to fix!

If you use the verbose mode with `-vvvv` on a networking module you can see all the provider methods being used. This will give you the knobs you need to adjust settings on the provider:

```json
"provider": {
  "auth_pass": null,
  "authorize": true,
  "host": null,
  "password": "VALUE_SPECIFIED_IN_NO_LOG_PARAMETER",
  "port": null,
  "ssh_keyfile": null,
  "timeout": null,
  "transport": "cli",
  "use_ssl": null,
  "username": "admin",
  "validate_certs": null
}
```

Here are the two most common problems I see:

1. **The provider is not even set.** Try just setting the provider at the task level and use the verbose mode to make sure the correct provider info is being passed to login to your network switch.
2. **The task takes a long time to complete**, or the networking platform is a switch stack that needs to propagate the change amongst all the switches. This is where the timeout function can be used. Increase the timeout to make sure the task has time to complete.

Good luck and happy automating! Also please go join my repo at [github.com/network-automation](https://github.com/network-automation/).
