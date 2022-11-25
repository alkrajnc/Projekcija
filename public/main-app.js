// const button = document.getElementById("sendButton");
const selectCommand = document.getElementsByClassName('checkBoxSettings');
const fileTable = document.getElementsByClassName("fileTable")[0];
const deleteFileIcons = document.getElementsByClassName("trash");
const activeFile = document.getElementsByClassName("activeFile");
const fileName = document.getElementsByClassName("index");
const fileListDiv = document.getElementsByClassName("fileList");
const tvIconTv0 = document.getElementsByClassName("useFileTv0");
const tvIconTv1 = document.getElementsByClassName("useFileTv1");
const removeActiveMediaButton = document.getElementsByClassName("removeActiveMediaButton");
const removeAllMediaButton = document.getElementsByClassName("removeMediaButton")[0];

let fileList = {};
let activeElement;

document.body.onload = () => {
  getResponse();
  
}
removeAllMediaButton.onclick = () => {
  removeActiveMediaAll();
  console.log("e");
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
    if (fileList.rows[i].isActiveTv0 === 1) {
      activeFile[0].innerHTML = fileList.rows[i].file_name;
      removeActiveMediaButton[0].style.display = 'inline'
    }  else {
      activeFile[0].innerHTML = '';
      removeActiveMediaButton[0].style.display = 'none';
    }
    if (fileList.rows[i].isActiveTv1 === 1) {
      activeFile[1].innerHTML = fileList.rows[i].file_name;
      removeActiveMediaButton[1].style.display = 'inline'
    }  else {
      activeFile[1].innerHTML = '';
      removeActiveMediaButton[1].style.display = 'none';
    }
    
  }
  populateFileList(data);

}
function populateFileList (data) {
    for (let index = 0; index < Object.keys(data.rows).length; index++) {
        const parentDiv = document.createElement("div");
        const parentDiv2 = document.createElement("div");  
        parentDiv.classList.add("file");
        parentDiv2.classList.add("file");
        parentDiv.innerHTML = `
        
        <div class="fileInfoDiv flex flex-row justify-between">
          <div class="useFileTv0"><i class="fa-solid fa-tv"></i></div>
          <h4 class="index">${data.rows[index].file_name}</h4>
          <h4>${data.rows[index].file_type}</h4>
        </div>`;
        parentDiv2.innerHTML = `
        
        <div class="fileInfoDiv flex flex-row justify-between">
          <div class="useFileTv1"><i class="fa-solid fa-tv"></i></i></div>
          <h4 class="index">${data.rows[index].file_name}</h4>
          <h4>${data.rows[index].file_type}</h4>
        </div>`;
      fileListDiv[0].appendChild(parentDiv);
      fileListDiv[1].appendChild(parentDiv2);
    }
    Array.from(removeActiveMediaButton).forEach((item, index) => {
      item.onclick = () => {
        console.log(fileName[index].innerHTML)
        removeActiveMedia(index);
      };
      item.onmouseover = () => {
        item.style.color = '#ff0000bb';
        item.style.transform = 'scale(1.1)';
      }
      item.onmouseout = () => {
        item.style.color = 'gray';
        item.style.transform = 'scale(1)';
      }
    });
    Array.from(deleteFileIcons).forEach((item, index) => {
      item.onclick = () => {
        console.log(fileName[index].innerHTML)
        deleteFileFromServer(fileName[index].innerHTML);
      };
    });
    Array.from(tvIconTv0).forEach((item, index) => {
      item.onclick = () => {
        tvId = 0;
        useMedia(index, tvId);
      };
      item.onmouseover = () => {
        item.style.color = 'aqua';
        item.style.transform = 'scale(1.1)';
      }
      item.onmouseout = () => {
        item.style.color = 'white';
        item.style.transform = 'scale(1)';
      }
    });
    Array.from(tvIconTv1).forEach((item, index) => {
      item.onclick = () => {
        tvId = 1;
        useMedia(index, tvId);
      };
      item.onmouseover = () => {
        item.style.color = 'aqua';
        item.style.transform = 'scale(1.1)';
      }
      item.onmouseout = () => {
        item.style.color = 'white';
        item.style.transform = 'scale(1)';
      }
    });
  }
async function removeActiveMedia (index) {
  let filename = fileName[index].innerHTML;
  const response = await fetch(
    `http://localhost:3000/service/media/remove`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "*",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      },
      body: `{
        "tv_id": ${index},
        "filename": "${filename}"
      }`
    }
  );
  if (!response.ok) {
    throw new Error(`Error in removing display media`);
  } else {
    console.log("removed");
  }
}
async function removeActiveMediaAll (index) {
  location.href=location.href;
  const response = await fetch(
    `http://localhost:3000/service/media/remove`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "*",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      },
      body: `{
        "num_of_files": ${Object.keys(fileList).length},
        "all": "true"
      }`
    }
  );
  
}


async function useMedia (index, tvId) {
  console.log(index);
  let filename = fileName[index].innerHTML;
  const response = await fetch(
    `http://localhost:3000/service/media`,
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': "*",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "*"
      },
      body: `{
        "tv_id": ${tvId},
        "filename": "${filename}"
      }`
    }
  );
  if (!response.ok) {
    throw new Error(`Error in displaying media`);
  } else {
    
  }
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




