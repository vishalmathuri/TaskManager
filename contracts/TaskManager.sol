// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TaskManager {
    struct Task {
        uint id;
        string title;
        string description;
        bool isCompleted;
        address owner;
    }

    mapping(uint => Task) public tasks;
    uint public taskCounter;

    event TaskAdded(uint taskId, string title, address owner);
    event TaskCompleted(uint taskId);
    event TaskEdited(uint taskId, string newTitle, string newDescription);
    event TaskDeleted(uint taskId);

    modifier onlyTaskOwner(uint _taskId) {
        require(tasks[_taskId].owner == msg.sender, "Not the task owner");
        _;
    }

    function addTask(string memory _title, string memory _description) external {
        uint taskId = taskCounter++;
        tasks[taskId] = Task(taskId, _title, _description, false, msg.sender);
        emit TaskAdded(taskId, _title, msg.sender);
    }

    function markTaskCompleted(uint _taskId) external onlyTaskOwner(_taskId) {
        tasks[_taskId].isCompleted = true;
        emit TaskCompleted(_taskId);
    }

    function editTask(uint _taskId, string memory _newTitle, string memory _newDescription) external onlyTaskOwner(_taskId) {
        Task storage task = tasks[_taskId];
        task.title = _newTitle;
        task.description = _newDescription;
        emit TaskEdited(_taskId, _newTitle, _newDescription);
    }

    function deleteTask(uint _taskId) external onlyTaskOwner(_taskId) {
        delete tasks[_taskId];
        emit TaskDeleted(_taskId);
    }

    function getTasks() external view returns (Task[] memory) {
        Task[] memory allTasks = new Task[](taskCounter);
        for (uint i = 0; i < taskCounter; i++) {
            allTasks[i] = tasks[i];
        }
        return allTasks;
    }
}
