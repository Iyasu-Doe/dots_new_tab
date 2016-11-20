//----------------------------------------------
//Customization panel:
//Demo Drop: [xpos,ypos,(width & opacity)]
var drops=[];
var upincrement=1;
var dotfrequency = 0.98;
var imgarr=["tech.png","wood.jpg"];
//--------------------------------------------

//Just don't mess with these.
var marked=false; 
var wx,wy,can,ctx;
var thumbImg;


window.onload=function(){
  innotes = document.getElementById('innotes');
  noteslist = document.getElementById('noteslist');
  mainnotesbod = document.getElementById('mainnotesbod');
  displaynotes(); 
  innotes.addEventListener('keydown',addnote);
  
  //basic canvas setup. It is all correct.
  wx = window.innerWidth;
  wy = window.innerHeight;
  can=document.getElementById('can');
  resize();
  document.body.onresize=resize;
  ctx = can.getContext('2d');
  
  
  //makes the drops flow automatically. 
  
  thumbImg = new Image();
  thumbImg.onload=function(){
    requestAnimationFrame(createdrops);
 window.addEventListener('click',initdrop);
  requestAnimationFrame(main);
  };
  thumbImg.src="images/"+(imgarr[Math.floor((Math.random()*imgarr.length))]);
};

//for when user resizes canvas. 
function resize(){
  wx =window.innerWidth;
  wy = window.innerHeight; 
can.width  = window.innerWidth;
can.height = window.innerHeight;
}

//function to create droplet on user click. Not for automation by animation.
function initdrop(e){
  drops[drops.length]=[e.clientX-10,e.clientY-10,0,true];
}


function main(){
  ctx.clearRect(0,0,wx,wy);
  //if a drop is marked for death,kill it.
  if(marked !==false){
    drops.splice(marked,1);
    marked=false;
  }
  
  //main loop through drops
  for(var i=0;i<drops.length;i++){
    
    //if a drop is really wide mark it for death
    if(drops[i][2]>254){
        marked=i;
    }
    
     //Drawing circle and clipping images in.
      ctx.save();
ctx.beginPath();
ctx.arc(drops[i][0]+10,drops[i][1]+10,drops[i][2],0,2*Math.PI);
ctx.closePath();
      ctx.fill();
      ctx.clip();
      ctx.globalAlpha=(1.0-(drops[i][2])/255);
      ctx.drawImage(thumbImg, 0, 0, wx, wy);
      ctx.restore();
      
    drops[i][2]+=upincrement;
  }
  //starting main function again. 
  requestAnimationFrame(main);
}

//function to automate creation of drops
function createdrops(){
  if(Math.random()>dotfrequency){
    drops[drops.length]=[(Math.random()*wx),(Math.random()*wy),0,true];
  }
  requestAnimationFrame(createdrops);
}
//This is where the notes js file starts.
var innotes,noteslist,mainnotesbod,delb;
var c=0;
var num;
var items=[];
var noteitem=[];
var butons=[];



function displaynotes(){
  noteslist.innerHTML="<ol id='noteslist'></ol>";
  c=0;
  for(var i=0;i<20;i++){
    if(localStorage.getItem(i)!==null){
      c++;
      noteitem[i] = document.createElement('li');
     butons[i]=document.createElement('button'); 
  noteitem[i].innerHTML=localStorage.getItem(i);
  
  butons[i].innerHTML='x';
  butons[i].className='buton';
     
     noteslist.appendChild(noteitem[i]);
 noteslist.insertBefore(butons[i],noteitem[i]);
      butons[i].onclick=removenote;
    }else{
      break;
    }
  }
}

function addnote(event){
 if (event.keyCode == 13){
   for(var i=0;i<20;i++){
     if(localStorage.getItem(i)===null){
       localStorage.setItem((i),innotes.value);
       break;
     }
   }
   innotes.value="";
   displaynotes();
 } 
}
function removenote(){
  var child = this;
var parent = child.parentNode;
var index = Array.prototype.indexOf.call(parent.children, child);
  num=(index-1)/2;
  localStorage.removeItem(num);
  for(var i=num;i<c;i++){
    localStorage.setItem(i,localStorage.getItem(i+1));
  }localStorage.removeItem(c-1);
  displaynotes();
  
}