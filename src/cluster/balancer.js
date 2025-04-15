import cluster from "cluster";
import os from "os";
import { createServer } from "http";
import http from "http";
import process from "process";
import startServer from "../main.js";
import { config } from "../config/config.js";

const { PORT } = config;
const numCPUs = os.cpus().length;

// qo'shimcha port ochib beradi 
function workerPort() {
  let currentPort = +PORT;
  const port = +PORT;
  return function () {
    currentPort += 1;

    if (currentPort > port + numCPUs) {
      currentPort = port + 1;
    }

    return currentPort;
  };
}

// oldingi qiymatni saqlab qolgan holatda
const getWorkerPort = workerPort();


function isDataUpdated(masterData, workerData) {
  return JSON.stringify(masterData) !== JSON.stringify(workerData);
}

function sendMessageToWorkers(workers, message) {
  for (const worker of workers) {
    worker.send(message);
  }
}

if (cluster.isPrimary) {
  function onRequest(client_req, client_res) {
    const options = {
      path: client_req.url,
      method: client_req.method,
      headers: client_req.headers,
    };

    const proxy = http.request(
      "http://localhost:" + getWorkerPort(),
      options,
      function (res) {
        client_res.writeHead(res.statusCode, res.headers);
        res.pipe(client_res, {
          end: true,
        });
      }
    );

    client_req.pipe(proxy, {
      end: true,
    });

    client_res.once("finish", () => {
      sendMessageToWorkers(Object.values(cluster.workers), {
        message: "getDataFromWorker",
        currentUsers: process.USERS,
      });
    });
  }

  createServer(onRequest).listen(PORT, () => {
    console.log(`Main server is listening on port ${PORT}`);
  });

  for (let i = 1; i <= numCPUs; i++) {
    const worker = cluster.fork({ PORT: +PORT + i });
    worker.on("message", (users) => {
      sendMessageToWorkers(Object.values(cluster.workers), {
        message: "setDataToWorker",
        data: users,
      });
      process.USERS = users;
    });
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`
    );
  });
} else {
  await startServer();
  process.on("message", (data) => {
    if (
      data.message === "getDataFromWorker" &&
      isDataUpdated(process.USERS, data.currentUsers)
    ) {
      process.send(process.USERS);
    } else if (data.message === "setDataToWorker") {
      process.USERS = data.data;
    }
  });
}
