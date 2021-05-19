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
        await sleep(2000)
        reload()
      }
    });
}


async function getTodo() {
  fetch('https://simplewrite.azurewebsites.net/api/read')
  .then(async function(response) {
    var jsonData = await response.json()
    for(var i=0; i < jsonData.length; i++){
      var item = document.createElement("li")
      item.innerHTML = jsonData[i].note
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

// setInterval(function(){
//   var isoTime = new Date().toISOString()
//   result.innerHTML = new Date(isoTime).toLocaleString(undefined,{timeZone:'Asia/Kolkata'})
// },1000)