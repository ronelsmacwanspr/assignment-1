import AllImagesData from "./AllImagesData.js";
import TextTruncator from "./displayTextConvert.js";

const ImageItems = AllImagesData;

const leftImagesContainer = document.querySelector(".left-container");
const buttonsArray = new Array();

ImageItems.forEach((item,index) => {
    const button = document.createElement("button");
   
    const button_id = `button-${index}`;
    button.setAttribute("id",button_id);
    button.setAttribute("class","left-buttons");
    const imgsrc = item.previewImage;
    const displayText = item.title;



    const img_id = `image-${index}`;
    const text = `
                <div class="left-button-container">
                <div class = "img-container">
                <img src = ${imgsrc} id=${img_id} class="left-images"></img>
                </div>
                <div class = "img-text-container">
                ${TextTruncator(displayText,13)}
                </div>
                </div>
                `;

    button.innerHTML = text;
    leftImagesContainer.appendChild(button);
    buttonsArray.push(button);
});


function getTreshold() {

    
    const tempDiv = document.createElement("div");
   
    const el = document.querySelector(".img-text-container");

    const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    tempDiv.style.overflow="hidden";
    const fontSize = parseFloat(style);


    tempDiv.style.width = "220px";
    tempDiv.style.fontSize = fontSize+"px";

    const style2 = window.getComputedStyle(el, null).getPropertyValue('max-width');
    const maxWidth = parseFloat(style2);

    let treshold = 0;

    //console.log("maxWidth ", maxWidth);
    let cur="";

    document.body.appendChild(tempDiv); 
 
    while(tempDiv.scrollWidth < maxWidth){
       
      
        cur+="M";
        tempDiv.innerText=cur;
        treshold++;

        if(treshold>1000){
            console.log("inf loop");
            break;
        }


    }

    document.body.removeChild(tempDiv);

    return treshold;
    
}



let curButton=0;
const numButtons = buttonsArray.length;


function displayImageForButton(index){
    const right_img = document.querySelector(".right-image");
    right_img.setAttribute("src" , ImageItems[index].previewImage);

    const caption_txt = document.getElementById("caption");

    caption_txt.value = (ImageItems[index].title);

    buttonsArray[index].querySelector(".img-text-container").innerHTML
             = TextTruncator(ImageItems[index].title,getTreshold());

    
}

displayImageForButton(0);
buttonsArray[0].focus();

buttonsArray.forEach( (button,index) => {
    button.addEventListener( "click" , () => {


        curButton = index;
       displayImageForButton(curButton);


    })
} );

buttonsArray.forEach((button,index) => {
    button.addEventListener("keydown" , (event) => {

        
        curButton = index;  
  
        buttonsArray[curButton].blur();

        if(event.key == "ArrowUp"){
         --curButton;
         if(curButton==-1) curButton = numButtons-1;
        }

        else if(event.key == "ArrowDown"){
           curButton++;
           if(curButton==numButtons) curButton=0;
        }
        
        console.log(curButton);
        console.assert(curButton>=0 && curButton<numButtons, "out of bounds");


        buttonsArray[curButton].focus(); 
        displayImageForButton(curButton); 
     
    });
});

const img_caption = document.getElementById("caption");

img_caption.addEventListener( "input" , (event) => {
    const newText = event.target.value;

    const textField = buttonsArray[curButton].querySelector(".img-text-container");
   
    textField.innerText = TextTruncator(newText,getTreshold());

    ImageItems[curButton].title = (newText);  
} );
