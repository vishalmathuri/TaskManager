# Task Manager DApp

## Overview
This is a decentralized task management application (DApp) that allows users to add, edit, complete, and delete tasks. It integrates with an Ethereum-compatible blockchain using a smart contract written in Solidity.

## Features
- Add tasks with descriptions
- Edit tasks
- Mark tasks as completed
- Delete tasks
- Connects to a blockchain smart contract using Ethers.js
- Requires MetaMask for transactions
- Fetch and view all tasks (with task owner info)
- Admin restrictions using OpenZeppelin's `Ownable`

## Prerequisites
- **MetaMask** browser extension installed
- **Node.js** and **npm** installed
- **Solidity smart contract deployed** (replace `contractAddress` and `contractABI` in the frontend code with actual values)
- **Ethers.js** (Web3 interaction)
- **OpenZeppelin** (`Ownable` for ownership restrictions)
- **HTML/CSS/JavaScript** (Frontend)
- **Ethereum or Polygon Testnet**

## Smart Contract Features

- Struct-based `Task` model:
  - `id` (uint)
  - `title` (string)
  - `description` (string)
  - `completed` (bool)
  - `creator` (address)
- Mapping of tasks (taskId → Task struct)
- Only task owners can edit, complete, or delete their tasks
- Event emissions for key actions (add, edit, complete, delete)
- Gas optimized struct and logic

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager-dapp.git
cd task-manager-dapp
2. Install Dependencies (for Smart Contract)
bash
Copy code
npm install
3. Compile and Deploy Contract
bash
Copy code
npx hardhat compile
npx hardhat run scripts/deploy.js --network hardhat
For testnet deployment (e.g., Goerli or Polygon Mumbai), configure your hardhat.config.js with appropriate RPC and private key.

4. Update Frontend
Replace contractAddress and contractABI inside app.js with your deployed contract details.

5. Run Frontend Locally
Open index.html in your preferred browser with MetaMask installed.

Usage
Click on "Connect Wallet" to connect your MetaMask wallet.
Add new tasks using the form.
View all tasks with their status and owner.
Only task owners can edit, complete, or delete their tasks.


## Technologies Used
- **Solidity** (Smart Contract)
- **Ethereum/Polygon** (Blockchain Network)
- **Ethers.js** (Blockchain Interaction)
- **HTML, CSS, JavaScript** (Frontend UI)

## Notes
- Ensure your MetaMask wallet is connected to the correct network.
- Replace `contractABI` and `contractAddress` with actual contract details before running.

## License
MIT License