const address = "0xaEb5A55D47B35a28683B7628960253AD9DD70aeC";
let wallet="";
let TodoListABI;
let contract;

App = {

contracts: {},

  load: async () => {
   await App.loadWeb3()
 await App.renderTasks()
  },

loadWeb3: async () => {
    if (typeof window.ethereum !== "undefined") {
     let accounts=await  ethereum.request({ method: "eth_requestAccounts" })
          wallet = accounts[0]
          console.log(wallet)    
          $('#account').html(wallet)
          const todoList = await $.getJSON('TodoList.json')
          TodoListABI=todoList.abi
          

          const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

         contract = new ethers.Contract(address, TodoListABI, signer);
      console.log(Number(await contract.taskCount()))
      
  } else {
        window.open("https://metamask.io/download/", "_blank");
  }
  },





  renderTasks: async () => {
      // Load the total task count from the blockchain
      const taskCount = Number(await contract.taskCount())
      const $taskTemplate = $('.taskTemplate')

      // Render out each task with a new task template
      for (var i = 1; i <= taskCount; i++) {
        // Fetch the task data from the blockchain
        const task = await contract.tasks(i)
        const taskId = task[0].toNumber()
        const taskContent = task[1]
        const taskCompleted = task[2]

        // Create the html for the task
        const $newTaskTemplate = $taskTemplate.clone()
        $newTaskTemplate.find('.content').html(taskContent)
        $newTaskTemplate.find('input')
                        .prop('name', taskId)
                        .prop('checked', taskCompleted)
                        	.on('click', App.toggleCompleted)

        // Put the task in the correct list
        if (taskCompleted) {
          $('#completedTaskList').append($newTaskTemplate)
        } else {
          $('#taskList').append($newTaskTemplate)
        }

        // Show the task
        $newTaskTemplate.show()

      }


    },

createTask: async () => {

    const content = $('#newTask').val()
    await contract.createTask(content)
     window.location.reload()
  },

toggleCompleted: async (e) => {

    const taskId = e.target.name
    await contract.toggleCompleted(taskId)
    window.location.reload()
  },



  }



  $(() => {
    $(window).load(() => {
      App.load()
    })
})