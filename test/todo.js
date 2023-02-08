const TodoList = artifacts.require('./TodoList.sol')

contract('TodoList', (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed()
  })

 
  it('lists tasks', async () => {
    const taskCount = await this.todoList.taskCount()
    const task = await this.todoList.tasks(1)
    assert.equal(task.id.toNumber(), 1)
    assert.equal(task.content, 'TASK 1')
    assert.equal(task.completed, false)
    assert.equal(taskCount.toNumber(), 1)
  })



 

})