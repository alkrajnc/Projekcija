const logsOutput = document.getElementsByClassName("logs")[0];

document.body.onload = () => {
    fetchLogs();
}

async function fetchLogs() {
    const response = await fetch(
        'http://localhost:3000/service/logs',
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
    const logs = await response.json();
    outputLogs(logs);
}
function outputLogs(logs) {
    for (let index = 0; index < logs.data.length; index++) {
        const line = document.createElement("li");
        if (index % 2 === 0) {
            line.classList.add('rowEven');
        } else {
            line.classList.add('rowOdd');
        }
        line.innerHTML = logs.data[index];
        logsOutput.appendChild(line);
    }
}
