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

## Prerequisites
- **MetaMask** browser extension installed
- **Node.js** and **npm** installed
- **Solidity smart contract deployed** (replace `contractAddress` and `contractABI` in the frontend code with actual values)

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <repository_url>
cd task-manager-dapp
```

### 2. Deploy the Smart Contract
- Use **Remix IDE**, **Hardhat**, or **Truffle** to deploy `TaskManager.sol`
- Copy the deployed contract address
- Update the `contractAddress` variable in the frontend code

### 3. Run the Frontend
- Open `index.html` in a browser
- Ensure MetaMask is connected to the correct network

## Smart Contract Integration
The frontend uses **Ethers.js** to interact with the blockchain:
- `addTask(task, description)`: Adds a new task
- `editTask(taskIndex, newTask, newDescription)`: Edits an existing task
- `completeTask(taskIndex)`: Marks a task as completed
- `deleteTask(taskIndex)`: Removes a task

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

