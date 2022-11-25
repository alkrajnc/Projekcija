// const button = document.getElementById("sendButton");
const selectCommand = document.getElementsByClassName('checkBoxSettings');
const fileTable = document.getElementsByClassName("fileTable")[0];
const deleteFileIcons = document.getElementsByClassName("trash");
const activeFile = document.getElementById("activeFile");
const fileName = document.getElementsByClassName("index");
const fileListDiv = document.getElementsByClassName("fileList");

let fileList = {};
let activeElement;



document.body.onload = () => {
  getResponse();
}

async function getResponse() {
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
  if (!response.ok) {
    throw new Error(`Error fetching data`);
  }
  const data = await response.json();
  fileList = data;
  for (let i = 0; i < Object.keys(fileList.rows).length; i++) {
    if (fileList.rows[i].isActive === 1) {
      activeElement = i;
      activeFile.innerHTML = fileList.rows[activeElement].file_name;
      break;
    } else {
      activeFile.innerHTML = '';
    }
    
  }
  populateFileList(data);
  populateFileTable(data);
}
function populateFileList (data) {
    for (let index = 0; index < Object.keys(data.rows).length; index++) {
        const parentDiv = document.createElement("div");
        const parentDiv2 = document.createElement("div");  
        parentDiv.classList.add("file");
        parentDiv2.classList.add("file");
        parentDiv.innerHTML = `
        
        <div class="fileInfoDiv flex flex-row justify-between">
          <div class="useFile"><i class="fa-solid fa-projector"></i></div>
          <h4 class="index">${data.rows[index].file_name}</h4>
          <h4>${data.rows[index].file_type}</h4>
          <div class="trash"><i class="fa-solid fa-trash"></i></div>
        </div>`;
        parentDiv2.innerHTML = `
        
        <div class="fileInfoDiv flex flex-row justify-between">
          <div class="useFile"><i class="fa-solid fa-projector"></i></div>
          <h4 class="index">${data.rows[index].file_name}</h4>
          <h4>${data.rows[index].file_type}</h4>
          <div class="trash"><i class="fa-solid fa-trash"></i></div>
        </div>`;
      fileListDiv[0].appendChild(parentDiv);
      fileListDiv[1].appendChild(parentDiv2);
    }
    Array.from(deleteFileIcons).forEach((item, index) => {
      item.onclick = () => {
        console.log(fileName[index].innerHTML)
        deleteFileFromServer(fileName[index].innerHTML);
      };
    });
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
  } else {
    console.log("Okey");
  }
}




