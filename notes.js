var innotes,noteslist,mainnotesbod,delb;
var c=0;
var num;
var items=[];
var noteitem=[];
var butons=[];
window.onload=function(){
  innotes = document.getElementById('innotes');
  noteslist = document.getElementById('noteslist');
  mainnotesbod = document.getElementById('mainnotesbod');
  displaynotes(); 
  innotes.addEventListener('keydown',addnote);
  
};


function displaynotes(){
  noteslist.innerHTML="<ol id='noteslist'></ol>";
  c=0;
  for(var i=0;i<20;i++){
    c++;
    if(localStorage.getItem(i)!==("null"||"")){
      noteitem[i] = document.createElement('li');
     butons[i]=document.createElement('button'); 
  noteitem[i].innerHTML=localStorage.getItem(i);
  
  butons[i].innerHTML='x';
  butons[i].className='buton';
      noteslist.appendChild(noteitem[i]);
 noteslist.insertBefore(butons[i],noteitem[i]);
      butons[i].onclick=removenote;
    }else{
      if(i===0){
        noteslist.innerHTML+='You have no notes.';
      }
      break;
    }
  }
}

function addnote(event){
 if (event.keyCode == 13){
   localStorage.setItem((c-1),innotes.value);
   displaynotes();
 } 
}
function removenote(){
  var child = this;
var parent = child.parentNode;
var index = Array.prototype.indexOf.call(parent.children, child);
  num=index-1;
  
  localStorage.setItem((num-1),null);
  
  for(var i=num-1;i<c;i++){
    localStorage.setItem(i,localStorage.getItem((i+1)));
  }
  displaynotes();
  
}