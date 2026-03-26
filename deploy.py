#!/usr/bin/env python3
"""FTP Deploy Script for LAYRR/WEBCRAFT website."""
import ftplib
import os
import sys

HOST = "zxg.a9a.mytemp.website"
USER = "deniz@layrr.de"
PASS = "Bedburg181."

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
EXCLUDE_DIRS = {".git", ".github", "node_modules", "__pycache__"}
EXCLUDE_FILES = {"generate-landings.js", ".gitignore", "deploy.py"}

uploaded = 0

def upload_dir(ftp, local_path, remote_path=""):
    global uploaded
    for item in sorted(os.listdir(local_path)):
        if item in EXCLUDE_DIRS:
            continue
        local_item = os.path.join(local_path, item)
        remote_item = (remote_path + "/" + item) if remote_path else item

        if os.path.isdir(local_item):
            try:
                ftp.mkd(remote_item)
            except ftplib.error_perm:
                pass
            upload_dir(ftp, local_item, remote_item)
        else:
            if item in EXCLUDE_FILES:
                continue
            size = os.path.getsize(local_item)
            with open(local_item, "rb") as f:
                ftp.storbinary(f"STOR {remote_item}", f)
            uploaded += 1
            print(f"  [{uploaded:3d}] {remote_item} ({size:,} bytes)")


def main():
    print(f"Connecting to {HOST}...")
    ftp = ftplib.FTP()
    ftp.connect(HOST, 21, timeout=30)
    ftp.login(USER, PASS)
    print(f"Connected: {ftp.getwelcome()}\n")

    # Try to find web root (common names)
    root = ftp.pwd()
    for candidate in ["htdocs", "public_html", "www", "web"]:
        try:
            ftp.cwd(candidate)
            root = ftp.pwd()
            print(f"Web root: {root}")
            break
        except ftplib.error_perm:
            continue
    else:
        print(f"Using root: {root}")

    print(f"\nUploading files from {SCRIPT_DIR}...\n")
    upload_dir(ftp, SCRIPT_DIR)

    ftp.quit()
    print(f"\nDone! {uploaded} files uploaded.")
    print(f"Site should be live at: http://zxg.a9a.mytemp.website")


if __name__ == "__main__":
    main()
