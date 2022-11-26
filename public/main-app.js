const fileTable = document.getElementsByClassName("fileTable")[0];
const deleteFileIcons = document.getElementsByClassName("trash");
const activeFile = document.getElementsByClassName("activeFile");
const fileName = document.getElementsByClassName("index");
const fileListDiv = document.getElementsByClassName("fileList");
const tvIconTv0 = document.getElementsByClassName("useFileTv0");
const tvIconTv1 = document.getElementsByClassName("useFileTv1");
const removeAllMediaButton = document.getElementsByClassName("removeMediaButton")[0];

let fileList = {};
let activeElement;

document.body.onload = () => {
  fetchFileList();
  
  
}
removeAllMediaButton.onclick = () => {
  removeActiveMedia();
  async function removeActiveMedia () {
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
          "num_of_files": ${Object.keys(fileList).length}
        }`
      }
    );
    console.log(response.json());
  }
  setTimeout(() => {
    location.href=location.href;
  }, 100);
}


async function fetchFileList() {
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
  generateFileList(data);
  currentlyPlaying(fileList);
}

async function useMedia (index, tvId) {
  console.log(index);
  fetch(
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
        "filename": "${fileName[index].innerHTML}"
      }`
    }
  );
}

function currentlyPlaying () {
  for (let i = 0; i < Object.keys(fileList.rows).length; i++) {
    if (fileList.rows[i].isActiveTv0 === 1) {
      tempActive = i;
      activeFile[0].innerHTML = fileList.rows[tempActive].file_name;
    } 
    if (fileList.rows[i].isActiveTv1 === 1) {
      tempActive = i;
      activeFile[1].innerHTML = fileList.rows[tempActive].file_name;
    } 
  }
  
}
function generateFileList (data) {
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
    Array.from(tvIconTv0).forEach((item, index) => {
      item.onclick = () => {
        let tvId = 0;
        useMedia(index, tvId);
        currentlyPlaying();
        setTimeout(() => {
          location.href=location.href;
        }, 100);
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
    Array.from(tvIconTv1, (item, index) => {
        item.onclick = () => {
          let tvId = 1;
          useMedia(index, tvId);
          currentlyPlaying();
          setTimeout(() => {
            location.href=location.href;
          }, 100);
        }
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


