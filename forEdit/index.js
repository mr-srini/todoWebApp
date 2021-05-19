var todoInput = document.getElementById("todoInput");
var todoList = document.getElementById("todoList");
var result = document.getElementById("result");


async function addTodo() {
    fetch('https://simplewrite.azurewebsites.net/api/write',{
        method: "POST",
        body: JSON.stringify({note:todoInput.value})
    })
    .then(async function(response) {
      var jsonData = await response.json()
      result.innerText = jsonData.message.replace("Body", "Note")
      todoInput.value = ""
      if(response.status==200){
        await sleep(3000)
        reload()
      }
    });
}

async function getTodo() {
  fetch('https://simplewrite.azurewebsites.net/api/read')
  .then(async function(response) {
    var jsonData = await response.json()
    for(var i=0; i < jsonData.length; i++){
      // var removeIcon = document.createElement("i")
      // removeIcon.classList.add("fas")
      // removeIcon.classList.add("fa-minus-circle")
      var text = document.createElement("p")
      text.innerHTML = jsonData[i].note
      var item = document.createElement("li")
      item.classList.add("card")
      item.appendChild(text)
      // item.appendChild(removeIcon)
      todoList.appendChild(item)
    }
  });
}

function reload() {
  location.reload()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
