const express = require('express');
const app = express();

let users = [{
    name: "Vishal Jha",
    kidneys: [{
        healthy: false
        
    }]
}]

app.use(express.json());

app.get("/", function(req, res) {
    const jhonKidneys = users[0].kidneys;
    const numberOfKidneys = jhonKidneys.length;
    let healthyKidneys = jhonKidneys.filter(kidney => kidney.healthy);
    let numberOfHealthyKidneys = healthyKidneys.length; 

    let numberOfUnhealthyKidneys =  numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
    
})

app.post("/", function(req, res){
    const isHealthy = req.body.isHealthy;
    let jhonKidneys = users[0].kidneys;

    const UnhealthyKidneyIndex = jhonKidneys.findIndex(kidney => !kidney.healthy);

    if(UnhealthyKidneyIndex.length > 0) {
        jhonKidneys[UnhealthyKidneyIndex].healthy = isHealthy;
    }else{
        jhonKidneys.push({
            healthy: isHealthy
        })
    }
    res.send(
        "done"
    )
})

app.put('/', function(req, res) {
    for(i = 0; i < users[0].kidneys.length; i++) {
        if(users[0].kidneys[i].healthy === false){
            users[0].kidneys[i].healthy = true;
            res.send("operation successfull")
        }else{
            res.send("all kidneys are healthy")
        }
    }
    
})

app.delete('/', function(req, res){
    let kidneyCount = users[0].kidneys.filter(kidney => kidney.healthy !== true);
    if(kidneyCount.length === 0) {
        res.status(411).send("you have no bad kidneys") 
     }else{
    users[0].kidneys = users[0].kidneys.filter(kidney => kidney.healthy !== false);
    res.send("removed unhealthy kidney");
    
    

}

})

app.listen(3000)