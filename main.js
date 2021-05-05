img="";
status="";
object=[];
song="";
function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects"
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function preload() {
    img=loadImage('student.jpg');
    song=loadSound("jack_sparrow_remix.mp3");
}
function draw() {
    image(video,0,0,380,380);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0;i<object.length;i++){
            if (object[i].label!="person") {
                document.getElementById("no").innerHTML="Baby Not Found";
                song.play();
            }
            else{
                document.getElementById("no").innerHTML="Baby Found";
                song.stop();
            }
            document.getElementById("status").innerHTML="Status: Object Detected";
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function gotResults(error,results) {
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object=results;
    }
}