const { ethers } = require("hardhat");

async function main() {
  const TaskManager = await ethers.getContractFactory("TaskManager");
  const taskManager = await TaskManager.deploy();

  await taskManager.waitForDeployment(); // Use this instead of `.deployed()`
  
  console.log("TaskManager deployed to:", await taskManager.getAddress()); // Correct way to get address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
