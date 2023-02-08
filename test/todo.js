const Todo = artifacts.require("TodoList");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Todo", function (/* accounts */) {
  it("should assert true", async function () {
    this.todoList = await Todo.deployed();
    console.log('this.todoList: ', this.todoList.address);
    return assert.isTrue(true);

  });

  it("check taskcount", async function () {
    let taskCount = await this.todoList.taskCount()

    assert.equal(taskCount.toNumber(), 1)


  });

  it("insert new task", async function () {
    await this.todoList.creatTask("Task2")

  });

  it("check new task", async function () {
    let task = await this.todoList.Tasks(2)
    console.log('task: ', task);
    assert.equal("Task2", task.content)

  });

});
