song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload() {
    song = loadSound("Don(PagalWorld).mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function gotPoses(result){
    if(result.length > 0){
        console.log(result);

        scoreLeftWrist = result[0].pose.keypoints[9].score;
        scoreRightWrist = result[0].pose.keypoints[10].score;

        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " and leftWristY = " + leftWristY);

        rightWristX = result[0].pose.leftWrist.x;
        rightWristY = result[0].pose.leftWrist.y;
        console.log("rightWristX = " + rightWristX + " and rightWristY = " + rightWristY);
    }
}

function modelLoaded(){
    console.log("Posenet is initialized");
}

function draw() {
    image(video,0,0,500,500);
    fill("#FF0000");
    stroke("#4169E1");
    strokeWeight(5);
    if (scoreLeftWrist > 0.2) 
    {
        circle(leftWristX,leftWristY,20);
        numberLeftWristY = Number(leftWristY);
        removeDecimals = floor(numberLeftWristY);
        volume = removeDecimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume); 
    }
    
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
    
        if (rightWristY > 0 && rightWristY <= 100) 
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    
        else if (rightWristY > 100 && rightWristY <= 200) 
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
    
        else if (rightWristY > 200 && rightWristY <= 300) 
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
    
        else if (rightWristY > 300 && rightWristY <= 400) 
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
    
        else if (rightWristY > 400 && rightWristY <= 500) 
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        } 
    }
}

function playStart(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

