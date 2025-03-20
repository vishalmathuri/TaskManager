const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TaskManager", function () {
    let TaskManager, taskManager, owner, addr1, addr2;

    beforeEach(async function () {
        TaskManager = await ethers.getContractFactory("TaskManager");
        [owner, addr1, addr2] = await ethers.getSigners();
        taskManager = await TaskManager.deploy();
        await taskManager.waitForDeployment();
    });

    it("Should allow the owner to add a task", async function () {
        await expect(taskManager.addTask("Task 1", "Description 1"))
            .to.emit(taskManager, "TaskCreated")
            .withArgs(0, "Task 1", "Description 1", owner.address);

        const tasks = await taskManager.getAllTasks();
        expect(tasks.length).to.equal(1);
        expect(tasks[0].title).to.equal("Task 1");
        expect(tasks[0].description).to.equal("Description 1");
        expect(tasks[0].isCompleted).to.equal(false);
    });

    it("Should fetch all tasks", async function () {
        await taskManager.addTask("Task 1", "Description 1");
        await taskManager.addTask("Task 2", "Description 2");

        const tasks = await taskManager.getAllTasks();
        expect(tasks.length).to.equal(2);
        expect(tasks[1].title).to.equal("Task 2");
    });

    it("Should allow the owner to mark a task as completed", async function () {
        await taskManager.addTask("Task 1", "Description 1");
        await expect(taskManager.markTaskCompleted(0))
            .to.emit(taskManager, "TaskCompleted")
            .withArgs(0);

        const tasks = await taskManager.getAllTasks();
        expect(tasks[0].isCompleted).to.equal(true);
    });

    it("Should allow the owner to edit a task", async function () {
        await taskManager.addTask("Task 1", "Description 1");
        await expect(taskManager.editTask(0, "Updated Task", "Updated Description"))
            .to.emit(taskManager, "TaskEdited")
            .withArgs(0, "Updated Task", "Updated Description");

        const tasks = await taskManager.getAllTasks();
        expect(tasks[0].title).to.equal("Updated Task");
        expect(tasks[0].description).to.equal("Updated Description");
    });

    it("Should allow the owner to delete a task", async function () {
        await taskManager.addTask("Task to Delete", "Delete Me");
        await expect(taskManager.deleteTask(0))
            .to.emit(taskManager, "TaskDeleted")
            .withArgs(0);

        const tasks = await taskManager.getAllTasks();
        expect(tasks.length).to.equal(0);
    });

    it("Should prevent non-owners from modifying tasks", async function () {
        await taskManager.addTask("Task 1", "Description 1");

        await expect(
            taskManager.connect(addr1).editTask(0, "Hacked Task", "Oops")
        ).to.be.revertedWith("Not the task owner");
    });

    it("Should prevent non-owners from marking tasks as completed", async function () {
        await taskManager.addTask("Task 1", "Description 1");

        await expect(
            taskManager.connect(addr1).markTaskCompleted(0)
        ).to.be.revertedWith("Not the task owner");
    });

    it("Should prevent non-owners from deleting tasks", async function () {
        await taskManager.addTask("Task 1", "Description 1");

        await expect(
            taskManager.connect(addr1).deleteTask(0)
        ).to.be.revertedWith("Not the task owner");
    });
});
