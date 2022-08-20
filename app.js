const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { join } = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

const clientPath = `${__dirname}/client`;
console.log(`Serving static files from path ${clientPath}`);

app.use(express.static(clientPath));
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT);
console.log("Server listening at " + PORT);

//------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
const getPlayerObject = playerId => {
    return Object.values(gridSystem).find(obj => obj.id === playerId); 
}
const getPlayerObjectKey = playerId => {
    const findThis = Object.values(gridSystem).find(obj => obj.id === playerId);
    return Object.keys(gridSystem).find(key => gridSystem[key] === findThis);
}
const getLockIdFromPassword = password => {
    const findThis = Object.values(gridSystem.lockIds).find(obj => obj.password === password);
    return Object.keys(gridSystem.lockIds).find(key => gridSystem.lockIds[key] === findThis);

    // const findThisObject = Object.values(gridSystem.lockIds).find(obj => obj.password === data);
    //     const lockId = Object.keys(gridSystem.lockIds).find(key => gridSystem.lockIds[key] === findThisObject);
}

const gridMatrix = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,30,0,0,0,0,0,1,1,1,0,0,1],
    [1,0,0,30,0,0,1,0,0,1,0,0,0,0,30,0,0,0,30,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,1,1,1,0,0,1,30,1,1,0,0,0,0,1,1,1,1,1,0,0,0,30,0,0,0,30,0,30,0,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,1,0,0,0,0,30,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,30,0,1],
    [1,0,0,30,0,0,0,0,0,30,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,1,0,1],
    [1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,30,0,0,0,30,0,0,0,0,0,30,0,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,1,1,1,1,30,1,1,1,1,1,0,0,0,1,0,0,0,0,0,1,0,0,30,0,1],
    [1,0,0,30,0,0,0,0,0,1,0,30,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,1,0,1],
    [1,1,1,1,0,0,0,0,0,30,0,1,0,0,30,0,0,0,30,0,0,0,30,0,0,0,0,0,30,0,0,1,0,1],
    [1,0,0,1,1,1,30,1,1,1,0,1,0,0,1,1,1,1,1,1,30,1,1,0,0,0,0,0,1,0,0,30,0,1],
    [1,0,0,30,0,0,0,0,0,30,0,1,0,0,30,0,0,0,1,0,0,0,30,0,0,0,0,0,1,0,0,1,0,1],
    [1,1,1,1,0,0,0,0,0,1,0,30,0,0,1,0,0,0,30,0,0,0,1,1,1,1,1,1,1,0,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,1,1,1,1,30,1,1,1,1,1,0,0,0,1,0,0,0,0,0,30,0,0,30,0,1],
    [1,0,0,30,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,30,0,0,0,0,0,1,0,0,1,0,1],
    [1,1,1,1,0,0,0,0,0,30,0,0,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,0,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,1,0,0,0,0,30,0,0,0,30,0,0,0,30,0,0,0,30,0,30,0,0,30,0,1],
    [1,0,0,30,0,0,1,30,1,1,0,0,0,0,1,1,1,1,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0,1],
    [1,1,1,1,0,0,1,0,0,1,0,0,0,0,30,0,0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,30,0,0,0,30,0,0,0,0,0,1,1,1,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
                                
];

const gridMatrix2 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,20,20,20,20,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,1,20,1,20,20,20,20,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,20,20,1,20,20,20,20,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,1,1,1,1,1,1,1,20,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,20,20,20,20,20,20,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,20,1,1,1,1,1,1,1,1,1,1,20,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,20,20,1,0,0,0,1,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,1,20,1,0,1,0,1,0,20,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,1,20,1,0,1,0,1,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,0,20,1,20,1,20,1,20,1,0,1,0,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,20,1,20,1,20,1,20,1,0,1,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,1,20,1,20,1,20,1,0,1,1,1,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,1,1,1,1,1,1,1,20,1,20,1,20,1,0,1,0,1,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,20,20,20,20,20,20,20,1,20,20,20,1,0,0,0,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,20,0,1,0,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                            
];

const gridMatrix3 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
    [1,20,0,0,0,20,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,0,0,0,20,0,0,0,20,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,20,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,20,0,0,1,0,1,0,0,0,0,0,0],
    [1,20,0,0,1,20,20,20,0,20,0,1,0,1,1,0,1,20,0,20,0,20,20,1,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,20,0,1,20,20,0,20,0,20,1,0,1,1,0,1,0,20,0,20,20,20,1,0,20,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,1,20,20,20,0,20,0,1,0,1,1,0,1,20,0,20,0,20,20,1,20,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,20,0,1,20,20,0,20,0,20,0,0,0,0,0,0,0,20,0,20,20,20,1,0,20,0,1,0,1,0,0,0,0,0,0],
    [1,20,0,0,1,20,20,20,0,20,0,0,0,0,0,0,0,20,0,20,0,20,20,1,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,20,0,1,20,20,0,20,0,20,1,0,1,1,0,1,0,20,0,20,20,20,1,0,20,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,1,20,20,20,0,20,0,1,0,1,1,0,1,20,0,20,0,20,20,1,20,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,1,20,20,0,20,0,20,1,0,1,1,0,1,0,20,0,20,20,20,1,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,20,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,0,0,20,0,0,0,20,0,0,0,20,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
    [1,20,0,0,0,20,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,1,0,1,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0]
                
];

const gridMatrix4 = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,0,0,20,20,0,0,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,0,0,20,20,0,0,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,0,0,20,20,0,0,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,30,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,30,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,20,20,20,0,20,20,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,30,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,0,0,20,20,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,0,0,20,20,0,0,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,0,0,20,20,0,0,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,20,20,20,0,0,20,20,0,0,20,20,20,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    
];


//##############################################################################################################

class GridSystem {
    constructor(matrix, matrix2, matrix3, matrix4) {
        this.matrix = matrix;
        this.matrixMain = matrix;
        this.matrix2 = matrix2;
        this.matrix3 = matrix3;
        this.matrix4 = matrix4;
        this.cellSize = 40;
        this.padding = 2;
        this.startingSteps = 200;
        this.maxSteps = 500;
        //this.tempSteps = 0;
        this.winY = 11;
        this.winX = 37;
        this.walletMax = 1000;
        this.openLockBonus = 15;
        this.triggerList = [];

        this.allAreas = {
            "mainArea": this.matrixMain,
            "area2": this.matrix2,
            "area2e2": this.matrix2,
            "mainArea2": this.matrixMain,
            "area3": this.matrix3,
            "area3e2": this.matrix3,
            "area4": this.matrix4,
            "area4e2": this.matrix4
        }
        this.entrances = {
            "mainArea": { x: 29, y: 2},
            "mainArea2": {x: 29, y: 18},

            "area2": { x: 2, y: 3},
            "area2e2": { x: 21, y: 10},
            
            "area3": {x: 25, y: 15},
            "area3e2": {x: 2, y: 3},
            
            "area4": {x: 2, y: 5},
            "area4e2": {x: 11, y: 12}
        }
        this.area2Entance = ["area2", this.entrances["area2"].x, this.entrances["area2"].y].join(",");
        this.area2e2Entance = ["area2e2", this.entrances["area2e2"].x, this.entrances["area2e2"].y].join(",");
        this.area3Entance = ["area3", this.entrances["area3"].x, this.entrances["area3"].y].join(",");
        this.area3e2Entance = ["area3e2", this.entrances["area3e2"].x, this.entrances["area3e2"].y].join(",");
        this.area4Entance = ["area4", this.entrances["area4"].x, this.entrances["area4"].y].join(",");
        this.area4e2Entance = ["area4e2", this.entrances["area4e2"].x, this.entrances["area4e2"].y].join(",");
        this.mainAreaEntance = ["mainArea", this.entrances["mainArea"].x, this.entrances["mainArea"].y].join(",");
        this.mainArea2Entance = ["mainArea2", this.entrances["mainArea2"].x, this.entrances["mainArea2"].y].join(",");
        this.allDoorsCoordinates = {
            "area2,1,3": "mainArea",
            "area2,21,11": "area4",
            "mainArea,29,1": "area2",
            //"mainArea2,29,1": "area2",
            "mainArea,29,19": "area3",
            //"mainArea2,29,19": "area3",
            "area3,24,15": "mainArea2",     
            "area3,1,3": "area4e2",     
            "area4,1,5": "area2e2",     
            "area4,12,12": "area3e2",     
            test() {console.log("test")}
        }
        this.cdm = {
            area1: [{x:2,y:10},{x:17,y:10},{x:20,y:2},{x:20,y:18},{x:23,y:3},{x:23,y:17},{x:30,y:4},{x:30,y:16},{x:34,y:10}],
            area2: [{x:1,y:8},{x:10,y:10},{x:13,y:1},{x:21,y:13}],
            area3: [{x:16,y:2}],
            area4: [{x:7,y:8}]
        }
        this.cdmByArea = {
            "mainArea": this.cdm.area1,
            "mainArea2": this.cdm.area1,
            "area2": this.cdm.area2,
            "area3": this.cdm.area3,
            "area4": this.cdm.area4
        }     

        this.extraArr = ["TCR", "LXR", "LK", "JHA", "JV", "JL", "SZF", "H", "CJH", "KX"];

        this.p1 = { x: 1, y: 19, lable: 2, id: this.extraArr[0], steps: 1000, area: "mainArea", wallet: 0, total: 0, storeSteps: 1000 };

        this.p2 = { x: 1, y: 1, lable: 3, id: this.extraArr[1], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 2500, storeSteps: 0 };
        this.p3 = { x: 1, y: 4, lable: 4, id: this.extraArr[2], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 2300, storeSteps: 0 };
        this.p4 = { x: 1, y: 7, lable: 5, id: this.extraArr[3], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 1400, storeSteps: 0 };
        this.p5 = { x: 1, y: 10, lable: 6, id: this.extraArr[4], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 3600, storeSteps: 0 };

        this.p6 = { x: 1, y: 13, lable: 7, id: this.extraArr[5], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 2000, storeSteps: 0 };
        this.p7 = { x: 1, y: 16, lable: 8, id: this.extraArr[6], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 5300, storeSteps: 0 };
        this.p8 = { x: 7, y: 1, lable: 9, id: this.extraArr[7], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 0, storeSteps: 0 };
        this.p9 = { x: 7, y: 19, lable: 10, id: this.extraArr[8], steps: this.startingSteps, area: "mainArea", wallet: 0, total: 0, storeSteps: 0 };
        this.p10 = { x: 2, y: 11, lable: 11, id: this.extraArr[9], steps: 300, area: "area2", wallet: 0, total: 0, storeSteps: 0 };

        this.playersArr = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9, this.p10];

        this.playersArr.forEach((player) => {
            this.#startingPoint(player);
        });

        //PLS COPY PASTE THIS OBJECT TO INDEX.JS "LABLE LOCK FUNCTION AND FLIP ROW WITH COL"
        this.allLocksCoord = {
            "mainArea,3,2":{head:"Lock ID: 1",body:"Unlock: Cyc 12 or 15 x2 <br>",trigger:"",id:"1"},
            "mainArea,3,5":{head:"Lock ID: 2",body:"Unlock: Cyc 10 or 13 x2  <br> ",trigger:"",id:"2"},
            "mainArea,3,8":{head:"Lock ID: 3",body:"Unlock: Cyc 14 x2 <br> ",trigger:"",id:"3"},
            "mainArea,3,11":{head:"Lock ID: 4",body:"Unlock: Cyc 10 or 14 x3 <br>",trigger:"",id:"4"},
            "mainArea,3,14":{head:"Lock ID: 5",body:"Unlock: Cyc 13 x2 or 15 x3 <br>",trigger:"",id:"5"},
            "mainArea,3,17":{head:"Lock ID: 6",body:"Unlock: Cyc 15 x2 or 17 x3 <br>",trigger:"",id:"6"},
            "mainArea,7,3":{head:"Lock ID: 7",body:"Unlock: Cyc 17 x3 <br> ",trigger:"",id:"7"},
            "mainArea,7,17":{head:"Lock ID: 8",body:"Unlock: Cyc 8 x1 <br>",trigger:"",id:"8"},

            "mainArea,6,10":{head:"Lock ID: 9",body:"Unlock: Cyc 10 x1 or 13 x3 <br> ",trigger:"",id:"9"},
            "mainArea,11,8":{head:"Lock ID: 10",body:"Unlock: Cyc 12 x1 <br> ",trigger:"",id:"10"},
            "mainArea,11,12":{head:"Lock ID: 11",body:"Unlock: Cyc 12 x1 <br>",trigger:"",id:"11"},
            "mainArea,9,5":{head:"Lock ID: 12",body:"Unlock: Cyc 16 x3 <br> ",trigger:"",id:"12"},
            "mainArea,9,9":{head:"Lock ID: 13",body:"Unlock: Cyc 11 x2 <br> ",trigger:"",id:"13"},
            "mainArea,9,11":{head:"Lock ID: 14",body:"Unlock: Cyc 10 x1 or 14 x2 <br> ",trigger:"",id:"14"},
            "mainArea,9,15":{head:"Lock ID: 15",body:"Unlock: Cyc 16 x3 <br> ",trigger:"",id:"15"},

            "mainArea,13,7":{head:"Lock ID: 16",body:"Unlock: Cyc 10 x1 or 12 x2 <br> ",trigger:"",id:"16"},
            "mainArea,13,13":{head:"Lock ID: 17",body:"Unlock: Cyc 10 x1 or 14 x2 <br> ",trigger:"",id:"17"},
            "mainArea,14,2":{head:"Lock ID: 18",body:"Unlock: Cyc 11 x1 or 13 x2 <br> ",trigger:"",id:"18"},
            "mainArea,14,4":{head:"Lock ID: 19",body:"Unlock: Cyc 10 x1 or 14 x2 <br> ",trigger:"",id:"19"},
            "mainArea,14,9":{head:"Lock ID: 20",body:"Unlock: Cyc 13 x1 <br> ",trigger:"",id:"20"},
            "mainArea,14,11":{head:"Lock ID: 21",body:"Unlock: Cyc 15 x3 <br> ",trigger:"",id:"21"},
            "mainArea,14,16":{head:"Lock ID: 22",body:"Unlock: Cyc 11 x1 or 13 x2 <br> ",trigger:"",id:"22"},
            "mainArea,14,18":{head:"Lock ID: 23",body:"Unlock: Cyc 10 x1 or 14 x2 <br> ",trigger:"",id:"23"},

            "mainArea,18,2":{head:"Lock ID: 24",body:"Unlock: Cyc 12 x1 or 13 x2 <br>",trigger:"",id:"24"},
            "mainArea,18,6":{head:"Lock ID: 25",body:"Unlock: Cyc 13 x3 <br>",trigger:"",id:"25"},
            "mainArea,18,9":{head:"Lock ID: 26",body:"Unlock: Cyc 13 x2 <br>",trigger:"",id:"26"},
            "mainArea,18,12":{head:"Lock ID: 27",body:"Unlock: Cyc 13 x3 <br>",trigger:"",id:"27"},
            "mainArea,18,16":{head:"Lock ID: 28",body:"Unlock: Cyc 14 x4 <br>",trigger:"",id:"28"},
            "mainArea,18,19":{head:"Lock ID: 29",body:"Unlock: Cyc 12 x1 or 13 x2 <br>",trigger:"",id:"29"},
            "mainArea,20,10":{head:"Lock ID: 30",body:"Unlock: Cyc 10 x1 or 12 x2 <br>",trigger:"",id:"30"},

            "mainArea,22,1":{head:"Lock ID: 31",body:"Unlock: Cyc 10 x1 or 11 x2 <br>",trigger:"",id:"31"},
            "mainArea,22,3":{head:"Lock ID: 32",body:"Unlock: Cyc 15 x3 <br>",trigger:"",id:"32"},
            "mainArea,22,6":{head:"Lock ID: 33",body:"Unlock: Cyc 11 x2 <br>",trigger:"",id:"33"},
            "mainArea,22,9":{head:"Lock ID: 34",body:"Unlock: Cyc 10 x1 or 11 x2 <br>",trigger:"",id:"34"},
            "mainArea,22,11":{head:"Lock ID: 35",body:"Unlock: Cyc 10 x1 or 11 x2 <br>",trigger:"",id:"35"},
            "mainArea,22,14":{head:"Lock ID: 36",body:"Unlock: Cyc 12 x3 <br>",trigger:"",id:"36"},
            "mainArea,22,16":{head:"Lock ID: 37",body:"Unlock: Cyc 14 x3 <br>",trigger:"",id:"37"},
            "mainArea,22,19":{head:"Lock ID: 38",body:"Unlock: Cyc 9 x1 or 13 x3 <br>",trigger:"",id:"38"},

            "mainArea,26,3":{head:"Lock ID: 39",body:"Unlock: Cyc 13 x3 <br>",trigger:"",id:"39"},
            "mainArea,26,16":{head:"Lock ID: 40",body:"Unlock: Cyc 13 x3 <br>",trigger:"",id:"40"},
            "mainArea,28,3":{head:"Lock ID: 41",body:"Unlock: Cyc 9 x1 or 14 x3 <br>",trigger:"",id:"41"},
            "mainArea,28,6":{head:"Lock ID: 42",body:"Unlock: Cyc 11 x2 <br>",trigger:"",id:"42"},
            "mainArea,28,9":{head:"Lock ID: 43",body:"Unlock: Cyc 9 x1 or 13 x3 <br>",trigger:"",id:"43"},
            "mainArea,28,13":{head:"Lock ID: 44",body:"Unlock: Cyc 11 x2 <br>",trigger:"",id:"44"},
            "mainArea,28,16":{head:"Lock ID: 45",body:"Unlock: Cyc 9 x1 or 14 x3 <br>",trigger:"",id:"45"},
            "mainArea,31,4":{head:"Lock ID: 46",body:"Unlock: Cyc 9 x1 <br>",trigger:"",id:"46"},
            "mainArea,31,7":{head:"Lock ID: 47",body:"Unlock: Cyc 10 x2 <br>",trigger:"",id:"47"},
            "mainArea,31,10":{head:"Lock ID: 48",body:"Unlock: Cyc 11 x3 <br>",trigger:"",id:"48"},
            "mainArea,31,13":{head:"Lock ID: 49",body:"Unlock: Cyc 9 x1 <br>",trigger:"",id:"49"},
            "mainArea,31,16":{head:"Lock ID: 50",body:"Unlock: Cyc 10 x2 <br>",trigger:"",id:"50"}


        }
        this.lockIds = {
            1: {x:3, y:2, area:this.matrixMain, password:"59487"},
            2: {x:3, y:5, area:this.matrixMain, password:"87183"},
            3: {x:3, y:8, area:this.matrixMain, password:"53318"},
            4: {x:3, y:11, area:this.matrixMain, password:"96342"},
            5: {x:3, y:14, area:this.matrixMain, password:"61053"},
            6: {x:3, y:17, area:this.matrixMain, password:"66546"},
            7: {x:7, y:3, area:this.matrixMain, password:"18905"},
            8: {x:7, y:17, area:this.matrixMain, password:"31651"},
            9: {x:6, y:10, area:this.matrixMain, password:"46632"},
            10: {x:11, y:8, area:this.matrixMain, password:"5385"},
            11: {x:11, y:12, area:this.matrixMain, password:"70115"},
            12: {x:9, y:5, area:this.matrixMain, password:"93716"},
            13: {x:9, y:9, area:this.matrixMain, password:"89735"},
            14: {x:9, y:11, area:this.matrixMain, password:"57864"},
            15: {x:9, y:15, area:this.matrixMain, password:"72277"},
            16: {x:13, y:7, area:this.matrixMain, password:"93596"},
            17: {x:13, y:13, area:this.matrixMain, password:"44187"},
            18: {x:14, y:2, area:this.matrixMain, password:"48003"},
            19: {x:14, y:4, area:this.matrixMain, password:"42784"},
            20: {x:14, y:9, area:this.matrixMain, password:"9108"},
            21: {x:14, y:11, area:this.matrixMain, password:"11941"},
            22: {x:14, y:16, area:this.matrixMain, password:"69672"},
            23: {x:14, y:18, area:this.matrixMain, password:"5761"},
            24: {x:18, y:2, area:this.matrixMain, password:"44566"},
            25: {x:18, y:6, area:this.matrixMain, password:"80578"},
            26: {x:18, y:9, area:this.matrixMain, password:"84295"},
            27: {x:18, y:12, area:this.matrixMain, password:"59021"},
            28: {x:18, y:16, area:this.matrixMain, password:"99642"},
            29: {x:18, y:19, area:this.matrixMain, password:"41024"},
            30: {x:20, y:10, area:this.matrixMain, password:"47400"},
            31: {x:22, y:1, area:this.matrixMain, password:"64811"},
            32: {x:22, y:3, area:this.matrixMain, password:"60886"},
            33: {x:22, y:6, area:this.matrixMain, password:"52576"},
            34: {x:22, y:9, area:this.matrixMain, password:"76792"},
            35: {x:22, y:11, area:this.matrixMain, password:"74268"},
            36: {x:22, y:14, area:this.matrixMain, password:"48343"},
            37: {x:22, y:16, area:this.matrixMain, password:"51166"},
            38: {x:22, y:19, area:this.matrixMain, password:"19713"},
            39: {x:26, y:3, area:this.matrixMain, password:"96365"},
            40: {x:26, y:16, area:this.matrixMain, password:"17717"},
            41: {x:28, y:3, area:this.matrixMain, password:"29365"},
            42: {x:28, y:6, area:this.matrixMain, password:"58306"},
            43: {x:28, y:9, area:this.matrixMain, password:"59979"},
            44: {x:28, y:13, area:this.matrixMain, password:"21284"},
            45: {x:28, y:16, area:this.matrixMain, password:"76933"},
            46: {x:31, y:4, area:this.matrixMain, password:"59729"},
            47: {x:31, y:7, area:this.matrixMain, password:"73965"},
            48: {x:31, y:10, area:this.matrixMain, password:"6305"},
            49: {x:31, y:13, area:this.matrixMain, password:"65819"},
            50: {x:31, y:16, area:this.matrixMain, password:"35903"}

        }

        this.moveSwitch = 0;
        
    }

    getTheRightMatrix(player) {
        const entrance = {
            [this.area2Entance]: player.lable,
            [this.area3Entance]: player.lable,
            [this.mainAreaEntance]: player.lable,
            [this.mainArea2Entance]: player.lable,
            [this.area4Entance]: player.lable
        }
        return entrance;
    }

    #startingPoint(plyrSlot) {
        this.matrix = this.allAreas[plyrSlot.area];

        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;
    }

    #isValidMove(plyrSlot, x, y) {

        this.matrix = this.allAreas[plyrSlot.area];

        if (this.matrix[plyrSlot.y + y][plyrSlot.x + x] === 0) {
            return true;
        }
        if (this.matrix[plyrSlot.y + y][plyrSlot.x + x] === 20 && plyrSlot.wallet < this.walletMax) {
            plyrSlot.wallet += 100;
            return true;
        }
        if (this.matrix[plyrSlot.y + y][plyrSlot.x + x] === 30) {
            this.lockCoordinate = [plyrSlot.area, plyrSlot.x + x, plyrSlot.y + y],join(",");

            const lockCoordinateCode = this.allLocksCoord[this.lockCoordinate];
            const playerId = plyrSlot.id;
            

            plyrSlot.storeSteps = plyrSlot.steps;
            plyrSlot.steps = 0;

            const lockId = this.allLocksCoord[this.lockCoordinate].id;
            const requirement = this.allLocksCoord[this.lockCoordinate].body;
            const string = playerId + " - " + lockId;
            const string2 = requirement;
            this.triggerList.push(string);
            this.triggerList.push(string2);
            io.emit('pushTriggerList', this.triggerList);

            io.emit('lockTrigger', { lockCoordinateCode, playerId });
            return false;
        }
        
        return false;
    }

    
    #updPosition(keyCode, plyrSlot) {
        this.matrix = this.allAreas[plyrSlot.area];

        if (keyCode === 37) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y][plyrSlot.x - 1] = plyrSlot.lable;
            plyrSlot.x--;
        } else if (keyCode === 39) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y][plyrSlot.x + 1] = plyrSlot.lable;
            plyrSlot.x++;
        } else if (keyCode === 38) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y - 1][plyrSlot.x] = plyrSlot.lable;
            plyrSlot.y--;
        } else if (keyCode === 40) {
            this.matrix[plyrSlot.y][plyrSlot.x] = 0;
            this.matrix[plyrSlot.y + 1][plyrSlot.x] = plyrSlot.lable;
            plyrSlot.y++;
        }

    }

    movePlayer(keyCode, plyrSlot) {

        if (keyCode === 37) {
            if (this.#isValidMove(plyrSlot, -1, 0)) {
                this.#updPosition(37, plyrSlot);
                plyrSlot.steps--;
            }

        } else if (keyCode === 39) {
            if (this.#isValidMove(plyrSlot, 1, 0)) {
                this.#updPosition(39, plyrSlot);
                plyrSlot.steps--;
            }

        } else if (keyCode === 38) {
            if (this.#isValidMove(plyrSlot, 0, -1)) {
                this.#updPosition(38, plyrSlot);
                plyrSlot.steps--;
            }

        } else if (keyCode === 40) {
            if (this.#isValidMove(plyrSlot, 0, 1)) {
                this.#updPosition(40, plyrSlot);
                plyrSlot.steps--;
            }

        }
        this.playersArr.forEach((player) => {

            //this.allAreas[player.area][this.entrances[player.area].y][this.entrances[player.area].x] = player.lable

            const playerCoordinate = [player.area, player.x, player.y].join(",");

            const entrance = this.getTheRightMatrix(player);
            
            if (entrance[playerCoordinate] === undefined) {return}

            this.allAreas[player.area][this.entrances[player.area].y][this.entrances[player.area].x] 
                = entrance[playerCoordinate];

        });
    }


    transitionToAnotherArea(plyrSlot) {
        this.matrix[plyrSlot.y][plyrSlot.x] = 0;

        this.matrix = this.allAreas[plyrSlot.area];
        plyrSlot.y = this.entrances[plyrSlot.area].y;
        plyrSlot.x = this.entrances[plyrSlot.area].x;

        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;

        const convertArea = {
            "mainArea2": "mainArea",
            "area2e2": "area2",
            "area3e2": "area3",
            "area4e2": "area4",
        }
        if (convertArea[plyrSlot.area] === undefined) {return}
        plyrSlot.area = convertArea[plyrSlot.area];

    }
    transitionToAnotherArea2(area, plyrSlot) {
        this.matrix[plyrSlot.y][plyrSlot.x] = 0;

        this.matrix = this.allAreas[area];
        if (area === "area3") {
            plyrSlot.y = 1;
            plyrSlot.x = 28;
        } else if (area === "area2") {
            plyrSlot.y = 1;
            plyrSlot.x = 26;
        } else if (area === "mainArea") {
            plyrSlot.y = 1;
            plyrSlot.x = 1;
        }
        
        this.matrix[plyrSlot.y][plyrSlot.x] = plyrSlot.lable;

    }

    emitToUsers() {
        var sendGridMatrix1 = this.matrixMain;
        var sendGridMatrix2 = this.matrix2;
        var sendGridMatrix3 = this.matrix3;
        var sendGridMatrix4 = this.matrix4;
        var playersArr = this.playersArr;
                
        io.emit('sendMatrix', { sendGridMatrix1, sendGridMatrix2, sendGridMatrix3, sendGridMatrix4, playersArr });
    }

    test() {
        const gridSysKey = getPlayerObjectKey("TCR");
        console.log(this[gridSysKey].area);
    }

    teleportMeOut() {
        this.matrix[this.p1.y][this.p1.x] = 0;
        this.matrix[7][4] = this.p1.lable;
        this.p1.y = 7;
        this.p1.x = 4;
    }
    teleportMeIn() {
        this.matrix[this.p1.y][this.p1.x] = 0;
        this.matrix[7][1] = this.p1.lable;
        this.p1.y = 7;
        this.p1.x = 1;
    }

    winner(plyrSlot) {
        
        this.matrix[plyrSlot.y][plyrSlot.x] = 0;
        this.matrix[this.winY][this.winX] = plyrSlot.lable;
        plyrSlot.y = this.winY;
        this.winY++;
        
        plyrSlot.x = 38;
        
    }

    openLock(lockId) {
        this.lockIds[lockId].area[this.lockIds[lockId].y][this.lockIds[lockId].x] = 0;
    }

    dimensionDoors(plyrSlot) {

        const playerCoordinate = [[plyrSlot.area], [plyrSlot.x], [plyrSlot.y]].join(",");

        if (this.allDoorsCoordinates[playerCoordinate] === undefined) {return}

        plyrSlot.area = this.allDoorsCoordinates[playerCoordinate];
        this.transitionToAnotherArea(plyrSlot);
        this.emitToUsers();

    }

    depositCash(plyrSlot) {

        this.cdmByArea[plyrSlot.area].forEach((coordinate) => {
            if (plyrSlot.x === coordinate.x && plyrSlot.y === coordinate.y) {
                
                    plyrSlot.total += plyrSlot.wallet;
                    plyrSlot.wallet = 0;

                    gridSystem.emitToUsers();
            }
        });
    }

}

//##############################################################################################################


const gridSystem = new GridSystem(gridMatrix, gridMatrix2, gridMatrix3, gridMatrix4);

cdm = {
    area1: [{x:2,y:10},{x:17,y:10},{x:20,y:2},{x:20,y:18},{x:23,y:3},{x:23,y:17},{x:30,y:4},{x:30,y:16},{x:34,y:10}],
    area2: [{x:1,y:8},{x:10,y:10},{x:13,y:1},{x:21,y:13}],
    area3: {x:16,y:2}
}

var mindControlMode = false;
var mindControlledStudent = "";


io.sockets.on('connection', function (sock) {

    sock.on('newuser', (data) => {

        sock.id = data; //"TCR"
        io.emit('chat-to-clients', data + " connected");
        const playersArr = gridSystem.playersArr;

        const gridSysKey = getPlayerObjectKey(sock.id);

        var sendGridMatrix1 = gridSystem.matrixMain;
        var sendGridMatrix2 = gridSystem.matrix2;
        var sendGridMatrix3 = gridSystem.matrix3;
        var sendGridMatrix4 = gridSystem.matrix4;
        sock.emit('loadMatrix', { sendGridMatrix1, sendGridMatrix2, sendGridMatrix3, sendGridMatrix4, playersArr });
        io.emit('pushTriggerList', gridSystem.triggerList);


        sock.on('keyPress', function (data) {

            if (mindControlMode === false) {

                if (gridSystem[gridSysKey].steps <= 0) {return}

                gridSystem.movePlayer(data, gridSystem[gridSysKey]);

                gridSystem.dimensionDoors(gridSystem[gridSysKey]);
                           
                gridSystem.depositCash(gridSystem[gridSysKey]);

                gridSystem.emitToUsers();


            } else if (mindControlMode === true && sock.id === "TCR") {

                const newGridSysKey = getPlayerObjectKey(mindControlledStudent);
                if (gridSystem[newGridSysKey].steps <= 0) {return}
                gridSystem.movePlayer(data, gridSystem[newGridSysKey]);

                gridSystem.emitToUsers();

            }
            

        });

    });

    sock.on('disconnect', () => {
        io.emit('chat-to-clients', sock.id + " disconnected");
    });

    sock.on('openLock', (data) => {
        gridSystem.openLock(data);
        gridSystem.emitToUsers();
    });
    sock.on('teleportMeOut', () => {
        gridSystem.teleportMeOut();
    });
    
    sock.on('winner', (data) => {
        gridSystem.playersArr.forEach((player, index) => {
            if (player.id === data) {
                gridSystem.winner(gridSystem.playersArr[index]);
            }
        });
        
        var playersArr = gridSystem.playersArr;
        io.emit('sendMatrix', { gridMatrix, playersArr });
    });

    sock.on('teleportMeIn', () => {
        gridSystem.teleportMeIn();
    });

    sock.on('addSteps', (data) => {
        
        gridSystem.playersArr.forEach((player) => {
            if (player.id === data.studentId) {
                var convertToNum = Number(data.getNum)
                if (player.steps + convertToNum > gridSystem.maxSteps) {
                    var message = player.id + " steps capacity exceeded! Failed."
                    io.emit('chat-to-clients', message);
                } else {
                    var message2 = player.id + " added " + convertToNum + " steps succesful!"
                    player.steps += convertToNum;
                    io.emit('chat-to-clients', message2);
                }

                gridSystem.emitToUsers();
            }
        });
    });
    sock.on('sendPW', (data) => {
        gridSystem.playersArr.forEach((player) => {
            if (player.id === data.studentId) {
                const convertToNum = Number(data.getNum);
                const message = "Password for lock id: " + convertToNum + " is " + gridSystem.lockIds[convertToNum].password;
                const playerId = player.id;
                const message2 = "Password successfully sent to " + playerId;
                const gridSysPlyrKey = getPlayerObjectKey(playerId);
                gridSystem[gridSysPlyrKey].steps = gridSystem[gridSysPlyrKey].storeSteps + gridSystem.openLockBonus;


                var index = gridSystem.triggerList.indexOf(playerId + " - " + convertToNum);
                if (index !== -1) {
                    gridSystem.triggerList.splice(index, 2);
                }
                io.emit('pushTriggerList', gridSystem.triggerList);

                io.emit('pm', { message, message2, convertToNum, playerId });

                gridSystem.emitToUsers();
            }
        });
    });
    sock.on('failed', (data) => {
        const convertToNum = Number(data.getNum);
        const playerId = data.studentId;
        const gridSysPlyrKey = getPlayerObjectKey(playerId);
        gridSystem[gridSysPlyrKey].steps = gridSystem[gridSysPlyrKey].storeSteps;

        var index = gridSystem.triggerList.indexOf(playerId + " - " + convertToNum);
        if (index !== -1) {
            gridSystem.triggerList.splice(index, 2);
        }
        io.emit('pushTriggerList', gridSystem.triggerList);
        gridSystem.emitToUsers();

    });

    sock.on('mindControl', (data) => {
        mindControlledStudent = data;
        mindControlMode = true;
    });
    sock.on('mindControlOff', () => {
        mindControlledStudent = "";
        mindControlMode = false;
    });

    sock.on('teleportPlayerArea2', (data) => {

        const gridSysKey = getPlayerObjectKey(data);
        gridSystem[gridSysKey].area = "area2";
        gridSystem.transitionToAnotherArea2("area2", gridSystem[gridSysKey]);

        gridSystem.emitToUsers();
        
    });
    sock.on('teleportPlayerArea3', (data) => {

        const gridSysKey = getPlayerObjectKey(data);
        gridSystem[gridSysKey].area = "area3";
        gridSystem.transitionToAnotherArea2("area3", gridSystem[gridSysKey]);

        gridSystem.emitToUsers();
        
    });

    sock.on('teleportPlayerMainArea', (data) => {

        const gridSysKey = getPlayerObjectKey(data);
        gridSystem[gridSysKey].area = "mainArea";
        gridSystem.transitionToAnotherArea2("mainArea", gridSystem[gridSysKey]);

        gridSystem.emitToUsers();
        
    });

    sock.on('unlockUsingPassword', (data) => {
        
        const lockId = getLockIdFromPassword(data.extractNum);

        if (lockId === undefined) return
        gridSystem.openLock(lockId);


        // const gridSysPlyrKey = getPlayerObjectKey(data.playerId);
        // gridSystem[gridSysPlyrKey].steps = gridSystem[gridSysPlyrKey].storeSteps + 30;
        gridSystem.emitToUsers();
        io.emit('chat-to-clients', data.playerId + " unlock success ID:" + lockId);
        
    });

    sock.on('chat-to-server', (data) => {
        io.emit('chat-to-clients', data);
    });

});


/* setInterval(function () {
    var playersArr = gridSystem.playersArr;
    io.emit('sendMatrix', { gridMatrix, playersArr });

}, 2000); */