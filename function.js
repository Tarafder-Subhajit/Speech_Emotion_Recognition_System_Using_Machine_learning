
const speech=window.webkitSpeechRecognition;

var rec=new speech();
const startButton=document.querySelector(".record");
const stopButton=document.querySelector(".stoprecord");
const para_alert=document.querySelector(".alert");

const sad_arr=["sad","homesick","wistful","unhappy","gloomy","bleak","subdued","sombre","agonized","agony","broken","depressed",
"devastated","down","downhearted","grieved","grieving","harassed","heartsick","heavy","low","miserable","sorrow","sorry",
"terrible","crying","cry","not well","not well enough","tired","i'm not good","i'm not fine"];

const calm_arr=["still","tranquil","quiet","serene","peaceful","pacific","undisturbed","restful","balmy",
"at peace","rest","resting","sleeping","sleep","sweet"];

const happy_arr=["happy","good","cheerful","cheery","merry","joyful","joyfull","cheerfull","smiling","delighted","jolly",
"joyous","blessed","glowing","satisfied","thrilled","overjoyed","in a good mood","kiss","hug","gift",
"i like you","i love you","hi my name is","hello my name is","hi","hello","hay","like","love"];

const angry_arr=["angry","annoyed","cross","irritated","resentfull","resentful","fuming","hot as red","flaming","short tempered",
"wrath","fiery","ill-tempered","not in a good mood","fight","beat","kick","slap","punch","kill","hate","shit","fuck","fuck off",
"go away","beat you","annoying","irritating","shut up"];

const fear_arr=["fear","feared","frightened","scared","nervous","panic","tense","uneasy","terrified","hesitate",
"hesitated","alarmed","petrified","worried","anxious","afraid"];

const disgust_arr=["disgusting","disgustful","yuck","bad smelling","smelly","not good","ugly","bad looking",
"i don't like it","ew","eww","ewww","ewwww","ewwwww","sick","stingy","foul","i don't like you","smell bad"
];

var displayText="";

rec.continuous=true;

rec.onstart=function(){
alert("Recording is ON");    
}

rec.onerror=function(){
    alert("Try Again!!");
}
rec.onresult=function(event){
    var current=event.resultIndex;
    var convert=event.results[current][0].transcript;
    displayText+=convert;
    displayText=displayText.toLowerCase();
    
    var sad=false,calm=false,angry=false,happy=false,fear=false,disgust=false;
    var show="";
for(var i=0;i<sad_arr.length;i++)
{
    if(displayText.indexOf(sad_arr[i])!=-1){
         
        sad=true;
        break;
    }
}


for(var i=0;i<calm_arr.length;i++)
{
        if(displayText.indexOf(calm_arr[i])!=-1){
             
            calm=true;
            break;
        }
}

for(var i=0;i<angry_arr.length;i++)
{
        if(displayText.indexOf(angry_arr[i])!=-1){
             
            angry=true;
            break;
        }
}
for(var i=0;i<happy_arr.length;i++)
{
        if(displayText.indexOf(happy_arr[i])!=-1){
             
            happy=true;
            break;
        }
}
for(var i=0;i<fear_arr.length;i++)
{
        if(displayText.indexOf(fear_arr[i])!=-1){
             
            fear=true;
            break;
        }
}
for(var i=0;i<disgust_arr.length;i++)
{
        if(displayText.indexOf(disgust_arr[i])!=-1){
             
            disgust=true;
            break;
        }
}

if(calm){show="CALM";}
else if(disgust){show="DISGUST";}
else if(fear){show="FEAR";}
else if(happy){show="HAPPY";}
else if(sad){show="SAD";}
else if(angry){show="ANGRY";}
else{show="NEUTRAL";}
para_alert.innerHTML="Transcript: "+displayText+" Emotion: "+show;
rec.stop();
}



stopButton.onclick=function(event){
    para_alert.innerHTML="";
    displayText="";
}
startButton.onclick=function(event){
if(displayText.length>=1){
    displayText="";
}

rec.start();
}






