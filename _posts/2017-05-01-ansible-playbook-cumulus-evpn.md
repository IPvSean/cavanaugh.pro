---
layout: post
title: "Ansible Playbook for Cumulus EVPN"
date: 2017-05-01
tags: [ansible, cumulus, evpn, networking]
---

I wrote a quick Ansible playbook for Cumulus EVPN. Cumulus EVPN is now GA (Generally Available) but the packages are still in the EA (early access repo) so it can be confusing if you are not used to the Debian packaging system. This is nice that it won't try to upgrade/reboot unless you have the wrong version. Feel free to read the documentation on the Cumulus Networks website.

```yaml
- name: check current quagga version for EVPN
  command: "dpkg -l quagga"
  register: quaggaversion
  when: ansible_lsb.major_release == "3"

- name: uncomment early access repo
  lineinfile: >
    dest=/etc/apt/sources.list
    regexp="#deb     http://repo3.cumulusnetworks.com/repo CumulusLinux-3-early-access cumulus"
    line="deb     http://repo3.cumulusnetworks.com/repo CumulusLinux-3-early-access cumulus"
    state=present
  when: ansible_lsb.major_release == "3"

- name: install eau8 of quagga
  apt: name="cumulus-evpn" update_cache=yes
  when: ansible_lsb.major_release == "3" and "eau8" not in quaggaversion.stdout

- name: upgrade switch (part of EVPN install instructions)
  shell: "apt-get upgrade -y --force-yes -o Dpkg::Options::='--force-confnew'"
  become: true
  become_method: sudo
  when: 'ansible_lsb.major_release == "3" and "eau8" not in quaggaversion.stdout'

- name: Reboot for apt-get upgrade
  shell: sleep 2 && shutdown -r now "Ansible updates triggered"
  async: 1
  poll: 0
  become: true
  ignore_errors: true
  when: 'ansible_lsb.major_release == "3" and "Cumulus" in ansible_lsb.id and "eau8" not in quaggaversion.stdout'

- name: Wait for everything to come back up
  local_action: wait_for port=22 host="{{ inventory_hostname }}" search_regex=OpenSSH delay=10
  when: 'ansible_lsb.major_release == "3" and "eau8" not in quaggaversion.stdout'
```
