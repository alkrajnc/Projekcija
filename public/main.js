// const button = document.getElementById("sendButton");
const selectCommand = document.getElementsByClassName('checkBoxSettings');
// const file = document.getElementById("fileUpload").files[0];
const fileTable = document.getElementsByClassName("fileTable")[0];
const deleteFileIcons = document.getElementsByClassName("trash");
const serverStatus = document.getElementsByClassName("fa-circle")[0];
const fileName = document.getElementsByClassName("index");
const sendFiles = document.getElementsByClassName('submit-files')[0];


let fileList = {};
let activeElement;


sendFiles.onclick = (event) => {
  uploadFile(event);
}

document.body.onload = () => {
  fetchFiles();
}

function uploadFile(event) {
  console.log("Elo");
  event.preventDefault();
  const files = document.getElementById("files");
  const formData = new FormData();
  formData.append("files", files.files[0]);
  fetch("http://localhost:3000/service/upload", {
      method: 'POST',
      headers: {
      },
      mode: 'cors',
      body: formData,
  });
  setTimeout(function(){
    location.href=location.href;
  }, 1000);
  
}


async function fetchFiles() {
  const response = await fetch(
    'http://localhost:3000/service',
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "*",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      }
    }
  );
  const data = await response.json();
  fileList = data;
  serverStatus.style.color = 'green';
  populateFileTable(data);
}

function populateFileTable (data) {
  for (let index = 0; index < Object.keys(data.rows).length; index++) {
      const parentDiv = document.createElement("div"); 
      parentDiv.classList.add("file");
      parentDiv.innerHTML = `
      <i class="fa-solid fa-photo-film"></i>
      <div class="fileInfoDiv flex flex-row justify-between">
        <h4 class="index">${data.rows[index].file_name}</h4>
        <h4>${data.rows[index].file_location}</h4>
        <h4>${data.rows[index].file_type}</h4>
        <h4>${data.rows[index].upload_time}</h4>
        <div class="trash"><i class="fa-solid fa-trash"></i></div>
      </div>`;
    fileTable.appendChild(parentDiv);
  }
  Array.from(deleteFileIcons).forEach((item, index) => {
    item.onclick = () => {
      console.log(fileName[index].innerHTML)
      deleteFileFromServer(fileName[index].innerHTML);
    };
  });
}
async function deleteFileFromServer (index) {
  
  const response = await fetch(
    `http://localhost:3000/service/${index}`,
    {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "*",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      }
    }
  );
  if (!response.ok) {
    throw new Error(`Error deleting`);
  }
  location.href=location.href;
}




