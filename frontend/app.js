const contractAddress = "0xe5d345d05f063c559D068c1B87710d33D3864Ce7"; // Replace with your contract address
const contractABI = [
    {"inputs":[{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"}],"name":"addTask","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_taskId","type":"uint256"}],"name":"markTaskCompleted","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_taskId","type":"uint256"}],"name":"deleteTask","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_taskId","type":"uint256"},{"internalType":"string","name":"_newTitle","type":"string"},{"internalType":"string","name":"_newDescription","type":"string"}],"name":"editTask","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[],"name":"getAllTasks","outputs":[{"components":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"bool","name":"completed","type":"bool"},{"internalType":"address","name":"creator","type":"address"}],"internalType":"struct TaskManager.Task[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"}
];

let provider, signer, contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        document.getElementById("walletAddress").innerText = `Connected: ${await signer.getAddress()}`;
        document.getElementById("connectWalletButton").style.display = "none";
        document.getElementById("taskManager").style.display = "block";
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("MetaMask not detected. Please install MetaMask.");
    }
}

async function addTask() {
    const taskTitle = document.getElementById("taskInput").value;
    const taskDesc = document.getElementById("taskDescription").value;
    if (taskTitle && taskDesc) {
        const tx = await contract.addTask(taskTitle, taskDesc);
        await tx.wait();
        fetchTasks();
    }
}

async function fetchTasks() {
    const tasks = await contract.getAllTasks();
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const taskId = task.id.toString();
        const taskTitle = task.title;
        const taskDesc = task.description;
        const taskStatus = task.completed ? '✅ Completed' : '⏳ Pending';
        const taskOwner = task.creator;

        let li = document.createElement("li");
        li.innerHTML = `
            <div class="task-header">Task ID: ${taskId}</div>
            <p><strong>Title:</strong> ${taskTitle}</p>
            <p><strong>Description:</strong> ${taskDesc}</p>
            <p><strong>Status:</strong> ${taskStatus}</p>
            <p><strong>Owner:</strong> ${taskOwner}</p>
            <button onclick="completeTask(${taskId})">Complete</button>
            <button onclick="editTask(${taskId})">Edit</button>
            <button onclick="deleteTask(${taskId})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function completeTask(taskId) {
    const tx = await contract.markTaskCompleted(taskId);
    await tx.wait();
    fetchTasks();
}

async function editTask(taskId) {
    const newTitle = prompt("Enter new title");
    const newDesc = prompt("Enter new description");
    if (newTitle && newDesc) {
        const tx = await contract.editTask(taskId, newTitle, newDesc);
        await tx.wait();
        fetchTasks();
    }
}

async function deleteTask(taskId) {
    const tx = await contract.deleteTask(taskId);
    await tx.wait();
    fetchTasks();
}
