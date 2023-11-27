song ="";
song2 ="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_status = "";
song2_status = "";

function preload()
{
    song = loadSound("music.mp3")
    song2 = loadSound("music2.mp3")
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_status = song.isPlaying();
    song2_status = song2.isPlaying();
    if(scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song_status == false) {
            song.play();
            document.getElementById("song").innerHTML ="Song : Harry Potter";
        }
    }

    if(scorerightWrist > 0.2) {
        cirlce(rightWristX, rightWristY, 20);
        song.stop();
        if(song2_status ==false) {
            song2.play();
            document.getElementById("song").innerHTML = "Song :Peter Pan"
        }
    }

    }
function modelLoaded(){
    console.log('PoseNet Is Initialised');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scorerightWrist = " + scorerightWrist + "scoreleftWrist = " + scoreleftWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY);

    
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);
    }

}
function play() {
    song.play();


}
 

