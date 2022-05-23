import AllImages from "./AllImages.js";

const ImagesArray = AllImages;

let left_container = document.querySelector(".left-container");
let buttonsArray = new Array();

function displayTextConvert(toReplace , fontSize){

    
    let treshold = Math.floor((20*20)/(fontSize));

   
    if(toReplace.length <= treshold){
       
        return toReplace;
    }
    let resStr="";

    let totChar = toReplace.length;
    
   console.assert(totChar > treshold , "Entire length consumed");
    

    // removing from mid .. 

    let blockedInd = new Array();

    for(let i=0;i<totChar;i++){
        blockedInd.push(0);
    }

    let toRem = totChar - treshold;

    blockedInd[Math.floor(totChar/2)]=1;
    --toRem;

    // block floor(toRem/2) in right
    // block ceil(toRem/2) in left

    let idx = Math.floor(totChar/2) + 1;

    for(let cnt = 0; cnt < Math.floor(toRem/2) ; ++cnt){
        blockedInd[idx] = 1;
        ++idx;
    }

    idx = Math.floor(totChar/2) - 1;
    for(let cnt = 0; cnt < Math.ceil(toRem/2); ++cnt){
        blockedInd[idx] = 1;
        --idx;
    }

    let got=0;

    for(let i=0;i<totChar;i++){
        if(blockedInd[i]==0) resStr+=toReplace[i];
        else if(!got){
            // a continous sequence will be blocked
            got=1;
            resStr+="..";
        }
        
    }

   
  
    return resStr;

}

ImagesArray.forEach((item,index) => {
    let button = document.createElement("button");
   
    let button_id = `button-${index}`;
    button.setAttribute("id",button_id);
    button.setAttribute("class","left-buttons");
    let imgsrc = item.previewImage;
    let displayText = item.title;



    let img_id = `image-${index}`;
    let text = `
                <div class="left-button-container">
                <div class = "img-container">
                <img src = ${imgsrc} id=${img_id} class="left-images"></img>
                </div>
                <div class = "img-text-container">
                ${displayTextConvert(displayText,20)}
                </div>
                </div>
                `;

    button.innerHTML = text;
    left_container.appendChild(button);
    buttonsArray.push(button);
});




let curButton=0 , numButtons = ImagesArray.length;


function displayImageForButton(index){
    let right_img = document.querySelector(".right-image");
    right_img.setAttribute("src" , ImagesArray[index].previewImage);

    let caption_txt = document.getElementById("caption");

    caption_txt.value = (ImagesArray[index].title);

    
    let el = buttonsArray[index].querySelector('.img-text-container');
    let style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    let fontSize = parseInt(style);
    el.innerText = displayTextConvert(ImagesArray[index].title,fontSize);

    
}

displayImageForButton(0);
buttonsArray[0].focus();
buttonsArray[0].style.backgroundColor="#0AA1DD";

buttonsArray.forEach( (button,index) => {
    button.addEventListener( "click" , () => {

        curButton = index;
        button.style.backgroundColor = "#0AA1DD";

        
      for(let i=0;i<numButtons;i++){
            if(i == index) continue;
            buttonsArray[i].style.backgroundColor="white";
        }
    
         displayImageForButton(index);

    } );
});


buttonsArray.forEach( (button,index) => {
    button.addEventListener("keydown" , (event) => {

        curButton = index;
        buttonsArray[curButton].style.backgroundColor = "white";
        if(event.key == "ArrowUp"){
            if(curButton == 0){
               curButton = numButtons-1;
            }
            else --curButton;
            
        }

        else if(event.key == "ArrowDown"){
            if(curButton == numButtons-1) curButton=0;
            else ++curButton;
        }

        buttonsArray[curButton].focus();
        displayImageForButton(curButton);
        buttonsArray[curButton].style.backgroundColor = "#0AA1DD";
        
    });
});

let img_caption = document.getElementById("caption");

img_caption.addEventListener( "input" , (event) => {
    let newText = event.target.value;

    let textField = buttonsArray[curButton].querySelector(".img-text-container");

    let el = textField;
    let style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    let fontSize = parseInt(style); 
   
    textField.innerText = displayTextConvert(newText,fontSize);

    ImagesArray[curButton].title = (newText);

    
} );
