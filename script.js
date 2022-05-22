import AllImages from "./AllImages.js";

const ImagesArray = AllImages;

let left_container = document.querySelector(".left-container");
let buttonsArray = new Array();

function displayTextConvert(toReplace){
    if(toReplace.length <= 30){
        return toReplace;
    }
    let resStr="";
    for(let i=0;i<17;i++){
        resStr+=toReplace[i];
    }
    
    resStr+="...";

    for(let i=toReplace.length-10;i<toReplace.length;++i){
        resStr+=toReplace[i];
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
                ${displayTextConvert(displayText)}
                </div>
                </div>
                `;

    button.innerHTML = text;
    left_container.appendChild(button);
    buttonsArray.push(button);
});



function displayImageForButton(index){
    let right_img = document.querySelector(".right-image");
    right_img.setAttribute("src" , ImagesArray[index].previewImage);

    let caption_txt = document.getElementById("caption");

    caption_txt.value = (ImagesArray[index].title);
}

let curButton=0 , numButtons = ImagesArray.length;

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
    textField.innerText = displayTextConvert(newText);
    ImagesArray[curButton].title = newText;
} );
