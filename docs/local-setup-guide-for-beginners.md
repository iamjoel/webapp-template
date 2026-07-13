# Run This Project Locally: A Beginner's Setup Guide

- **Category:** Getting Started / Local setup
- **Audience:** People with no programming experience who are running this project for the first time
- **Supported systems:** Windows 11 and macOS
- **Last updated:** July 13, 2026

This guide walks you through installing everything the project needs, initializing its local database, and opening the app in a browser. You can start with a computer that has no development tools installed, and no previous programming knowledge is required.

## What You Need to Install

| Tool                   | Required?                 | Purpose                                                                | Recommendation for this project                                                  |
| ---------------------- | ------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Node.js**            | Yes                       | Runs the project                                                       | Install the current **LTS** release; as of this guide's last update, use 24.18.x |
| **npm**                | Installed automatically   | Installs pnpm                                                          | Included with Node.js; do not install it separately                              |
| **pnpm**               | Yes                       | Downloads the software packages the project requires and runs commands | Use the project's required version, **11.8.0**                                   |
| **Git**                | Only if needed            | Downloads or updates the project from GitHub                           | Not needed if you already have the project folder or a ZIP file                  |
| **Web browser**        | Yes                       | Opens the app                                                          | Chrome, Edge, Safari, or Firefox                                                 |
| **Visual Studio Code** | Recommended, not required | Opens the project, edits configuration files, and provides a terminal  | Install the stable release                                                       |

> **You do not need to install:** Python, Java, Bun, Docker, MySQL, PostgreSQL, a separate SQLite application, or Turso. The project's dependencies—the software packages it requires—create the local SQLite database automatically. A Vercel account is only needed for deployment, not for running the project locally.

Keep at least **5 GB of free disk space** and a working internet connection. The first setup downloads several hundred megabytes of project dependencies, and macOS may also need to install Apple's Command Line Tools.

## What Is a Terminal?

A terminal is a window where you enter text commands:

- On Windows, use **PowerShell** or **Command Prompt**.
- On macOS, use the built-in **Terminal** app.
- If you install Visual Studio Code, select **Terminal > New Terminal** from its top menu. You can enter all commands in this guide there.

Copy one command line at a time and press **Enter** after each line. Do not copy the three backticks that appear above and below command examples.

## Step 1: Install Git (Optional)

You only need Git if you will download the project from GitHub. If someone has already given you the complete project folder or a ZIP file, skip to Step 2.

### Windows 11

1. Open the [official Git for Windows download page](https://git-scm.com/install/windows).
2. Select **Click here to download**. Choose **x64** for most Windows computers. Git itself also provides an **ARM64** installer for Windows on Arm devices.
3. Double-click the downloaded `.exe` installer.
4. Keep the default options, select **Next** until you reach the final screen, then select **Install** and **Finish**.
5. Close any open PowerShell windows, then open a new PowerShell window.

Verify the installation:

```powershell
git --version
```

If you see output similar to `git version 2.x.x`, Git is installed correctly.

### macOS

1. Open **Terminal**. Press `Command + Space`, type `Terminal`, and press Enter.
2. Enter:

```bash
xcode-select --install
```

3. If an installation window appears, select **Install**, accept the license terms, and wait for the installation to finish. This installs Apple's Command Line Tools, which include Git.
4. If macOS says the tools are already installed, continue to the next command.

Verify the installation:

```bash
git --version
```

If you see output similar to `git version 2.x.x`, Git is installed correctly. See the [official Git for macOS installation page](https://git-scm.com/install/mac) for other installation options.

## Step 2: Install Node.js (Required)

Node.js is the runtime that starts this project. The simplest and safest choice is the version marked **LTS** (Long-Term Support) on the official website. As of this guide's last update, that version is **Node.js 24.18.x LTS**.

This project supports Node.js 24.11.0 or later in the 24.x release line. It also supports Node.js 22.18.0 or later in the 22.x release line. Do not choose an unsupported odd-numbered release or the version marked **Current**.

### Windows 11

1. Open the [official Node.js download page](https://nodejs.org/en/download).
2. Select the version marked **LTS**, then choose **Windows Installer (.msi)**. This project's local database dependency has been verified with **x64** on Windows, so choose the x64 installer. If you have a Windows on Arm computer, use the x64 version of Node.js through Windows x64 emulation or contact the project administrator first.
3. Double-click the downloaded `.msi` installer.
4. Keep the default options, accept the license terms, and select **Next** until you can select **Install**.
5. When installation finishes, close any open PowerShell windows and open a new one.

### macOS

1. Open the [official Node.js download page](https://nodejs.org/en/download).
2. Select the version marked **LTS**, then choose **macOS Installer (.pkg)**.
3. Double-click the downloaded `.pkg` installer.
4. Follow the installer, select **Continue** and **Install**, and enter your Mac login password if asked.
5. When installation finishes, close any open Terminal windows and open a new one.

### Verify Node.js and npm

In Windows PowerShell, enter:

```powershell
node --version
npm.cmd --version
```

In macOS Terminal, enter:

```bash
node --version
npm --version
```

- `node --version` should preferably show `v24.18.x`. If another supported release is already installed, 24.x must be `v24.11.0` or later, and 22.x must be `v22.18.0` or later.
- `npm.cmd --version` or `npm --version` should show a version number.

If both commands show version numbers, Node.js and npm are installed correctly.

## Step 3: Install pnpm (Required)

pnpm downloads and manages the packages this project needs. The root `package.json` requires pnpm **11.8.0**, so install that exact version.

In Windows PowerShell, enter:

```powershell
npm.cmd install --global pnpm@11.8.0
```

In macOS Terminal, enter:

```bash
npm install --global pnpm@11.8.0
```

When installation finishes, enter `pnpm.cmd --version` in Windows PowerShell or `pnpm --version` on macOS. If the result is `11.8.0`, pnpm is installed correctly.

> The remaining steps use the shorter `pnpm` command. If Windows PowerShell says that `pnpm.ps1` cannot run, follow the troubleshooting instructions below and replace `pnpm` with `pnpm.cmd` in every remaining command.

> **macOS permission error:** If the installation command shows `EACCES` or `permission denied`, run `sudo npm install --global pnpm@11.8.0` instead. When you type your Mac password, no characters will appear on screen. This is normal; type the password and press Enter.

See the [official pnpm installation guide](https://pnpm.io/installation) for other supported installation methods.

## Step 4: Install Visual Studio Code (Recommended)

Visual Studio Code is not required to run the project, but it makes it easier to open the project folder, create configuration files, and use a terminal. It is a good choice for beginners.

1. Open the [official Visual Studio Code download page](https://code.visualstudio.com/Download).
2. On Windows, choose **Windows User Installer**, run the `.exe`, and keep the default installation options.
3. On macOS, download the `.dmg`, open it, and drag **Visual Studio Code** into the **Applications** folder.
4. Open Visual Studio Code. If you already have the project, select **File > Open Folder** and choose the project folder. If you do not have the project yet, complete Step 5 first.

You do not need any Visual Studio Code extensions to run this project.

## Web Browser: Usually Already Installed

Windows 11 includes Microsoft Edge, and macOS includes Safari. If either browser can open websites normally, you can use it to run and verify this project. You do not need another browser or a browser extension.

## Step 5: Get and Open the Project

### Option A: You Already Have the Project Folder

1. If you received a ZIP file, extract it completely. Do not try to run the project from inside the ZIP preview window.
2. A ZIP downloaded from GitHub may extract to a folder named `webapp-template-main`. This is normal.
3. Choose one way to open a terminal in the project folder:

   - **With Visual Studio Code:** Select **File > Open Folder**, open the project, then select **Terminal > New Terminal**.
   - **Windows 11 without Visual Studio Code:** Open the project folder in File Explorer, right-click an empty area, and select **Open in Terminal**.
   - **macOS without Visual Studio Code:** Open Terminal and type `cd `, including the space after `cd`. Drag the project folder from Finder into the Terminal window, then press Enter.

### Option B: Download the Project from GitHub

Enter these commands in a terminal:

```bash
git clone https://github.com/iamjoel/webapp-template.git
cd webapp-template
```

If GitHub asks you to sign in or says you do not have permission, ask the project administrator for access or request a complete ZIP file.

### Confirm That the Terminal Is in the Correct Folder

The terminal must be in the top-level project folder, also called the **project root**. In PowerShell or macOS Terminal, enter:

```bash
pwd
```

If you use Windows Command Prompt instead of PowerShell, enter `cd` to display the current path.

Do not rely only on the folder name. In Visual Studio Code, Windows File Explorer, or macOS Finder, confirm that the current folder contains all four of these items at the same level: `package.json`, `pnpm-lock.yaml`, `apps`, and `packages`.

## Step 6: Install the Project Dependencies

Make sure the terminal is in the project root, as confirmed in Step 5. Then enter:

```bash
pnpm install
```

The first installation may take a while. If the command finishes with `Done` and no error stops the installation, it succeeded. You do not need to install React, TypeScript, Vite, Hono, Drizzle, or the Vercel CLI separately; this command installs them inside the project.

> Use `pnpm install`. Do not replace it with `npm install` or `yarn install`. This is a pnpm workspace and includes a `pnpm-lock.yaml` lockfile.

## Step 7: Create the Local Configuration Files

The project needs two files named `.env` when it runs locally. If the project administrator already provided both files, skip this section and do not overwrite them.

If either file is missing, run both commands below, one line at a time, from the terminal in the project root. The commands are the same on Windows and macOS. The first command only handles the backend configuration, and the second only handles the frontend configuration. If a file already exists, the command reports that fact and leaves the file unchanged.

```bash
node -e "const fs=require('node:fs'),p='apps/server/.env';fs.existsSync(p)?console.log(p+' already exists; not changed'):fs.writeFileSync(p,'CORS_ORIGIN=http://localhost:3001\nDATABASE_URL=file:../../packages/db/local.db\n')"
node -e "const fs=require('node:fs'),p='apps/web/.env';fs.existsSync(p)?console.log(p+' already exists; not changed'):fs.writeFileSync(p,'VITE_SERVER_URL=http://localhost:3000\n')"
```

If a file is missing, it is normal for its command to finish without output. The commands create the missing files as follows:

- `apps/server/.env`:

```dotenv
CORS_ORIGIN=http://localhost:3001
DATABASE_URL=file:../../packages/db/local.db
```

- `apps/web/.env`:

```dotenv
VITE_SERVER_URL=http://localhost:3000
```

> `.env` starts with a period and has no `.txt` extension. The default local configuration above contains no passwords.

## Step 8: Initialize the Local Database

From the terminal in the project root, enter:

```bash
pnpm run db:push
```

With the default configuration above, this command creates or updates the local database file at `packages/db/local.db`. Seeing `No changes detected` also means the command succeeded and the database already matches the project's current database structure, or **schema**.

> **Data safety:** If someone else provided `apps/server/.env` and its `DATABASE_URL` does not begin with `file:`, ask the project administrator before continuing. Do not run `db:push` yourself because it may modify a remote database.

> The default configuration uses an embedded local SQLite file. You do not need to run `pnpm run db:local` or start a separate database service.

## Step 9: Start the Project

From the terminal in the project root, enter:

```bash
pnpm run dev
```

When the project starts successfully, the terminal shows output similar to:

```text
Server is running on http://localhost:3000
Local: http://localhost:3001/
```

1. Keep this terminal window open.
2. Open [http://localhost:3001](http://localhost:3001) in a browser. The page should load, and **API Status** should show a green **Connected** status.
3. Open [http://localhost:3000](http://localhost:3000) in another browser tab. If the page shows only `OK`, the backend is working.

`Connected` means the frontend can reach the backend health-check endpoint. The current template has no database tables, so this status does not mean the page has queried SQLite. Use the successful `db:push` result from Step 8 to verify database initialization.

`localhost` means this computer. Opening these addresses does not publish the project to the internet.

## Stop and Start the Project Again

### Stop the Project

1. Return to the terminal that is running `pnpm run dev`.
2. Press `Ctrl + C`.
3. If Windows asks `Terminate batch job (Y/N)?`, type `Y` and press Enter.

Closing the terminal or shutting down the computer also stops the project.

### Start the Project Next Time

1. Open a terminal in the project root. You can open the project in Visual Studio Code and select **Terminal > New Terminal**, or use the Windows/macOS system terminal method from Step 5.
2. Enter:

```bash
pnpm run dev
```

You normally do not need to reinstall the tools. Run `pnpm install` again if a project update adds dependencies. Run `pnpm run db:push` again if the database schema changes. After changing either `.env` file, press `Ctrl + C` to stop the project and run `pnpm run dev` again.

## Common Problems

### A Command Shows `not recognized`, `command not found`, or `not recognized as an internal or external command`

1. Close all terminal and Visual Studio Code windows, then open them again.
2. Run `node --version`, `npm --version`, and `pnpm --version` again. If PowerShell blocks scripts, use `npm.cmd --version` and `pnpm.cmd --version` instead.
3. Reinstall the tool whose command does not show a version number.

### Windows PowerShell Says Scripts Are Disabled or Cannot Load a `.ps1` File

Open **Command Prompt**, go to the project folder, and use the same npm or pnpm commands there. Alternatively, stay in PowerShell and replace `npm` with `npm.cmd` and `pnpm` with `pnpm.cmd`. For example:

```powershell
npm.cmd --version
pnpm.cmd run dev
```

### pnpm Says the Node.js Version Is Unsupported

Run `node --version`. If 24.x is earlier than 24.11.0, 22.x is earlier than 22.18.0, or you installed another non-LTS release, return to the official Node.js download page and install the current LTS version. Then close and reopen the terminal.

### `pnpm install` Cannot Download Packages

1. Confirm that your browser can open [https://www.npmjs.com](https://www.npmjs.com).
2. If you use a VPN or proxy, try turning it off or switching networks.
3. Run `pnpm install` again. pnpm reuses packages that have already been downloaded successfully.

### The Project Reports `Invalid environment variables`, `DATABASE_URL`, or `VITE_SERVER_URL`

Check the two `.env` files from Step 7. Their names, locations, and contents must match the guide. In particular, make sure neither file is named `.env.txt`.

### The Terminal Reports `EADDRINUSE` or `Port 3000/3001 is in use`

This usually means another copy of the project is already running in a different terminal:

1. Find the earlier terminal and press `Ctrl + C`.
2. If you cannot find it, restarting the computer is the simplest solution for a beginner.
3. Open the project again and run `pnpm run dev` only once.

If the terminal says `Port 3001 is in use, trying another one` and switches to port 3002, stop the previous process before continuing. The default cross-origin (CORS) configuration expects port 3001 and will not match port 3002.

### The Browser Cannot Open `localhost:3001`

1. Confirm that the terminal running `pnpm run dev` is still open.
2. Check that the terminal does not show an error.
3. Confirm that you entered `http://localhost:3001`, not port 3000. Port 3000 is the backend endpoint.
4. Return to the terminal, press `Ctrl + C`, and run `pnpm run dev` again.

## If the Project Still Does Not Run

Send the project administrator the following details instead of only saying that the project does not open:

1. Your operating system, such as Windows 11 or macOS.
2. The complete output of these commands:

```bash
node --version
pnpm --version
git --version
```

If you received the project as a ZIP file and did not install Git, you may omit the `git --version` result.

3. A complete screenshot of the first error shown after you run `pnpm run dev`.
4. The last step in this guide that you completed successfully.

> Do not send an `.env` file that contains a real password, token, or cloud database address. The default local configuration in this guide contains no password.

## Related Documentation and Official Sources

- [Project README](../README.md)
- [Official Node.js downloads](https://nodejs.org/en/download)
- [Official pnpm installation guide](https://pnpm.io/installation)
- [Official Git for Windows installation page](https://git-scm.com/install/windows)
- [Official Git for macOS installation page](https://git-scm.com/install/mac)
- [Official Visual Studio Code installation and getting-started guide](https://code.visualstudio.com/docs/getstarted/overview)
