#!/bin/bash

cp /var/app/current/.platform/systemd/journald.conf /etc/systemd/journald.conf
sudo systemctl restart systemd-journald