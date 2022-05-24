import AllImages from "./AllImages.js";
import TextTruncator from "./displayTextConvert.js";

let ImagesArray = AllImages;

let left_container = document.querySelector(".left-container");
let buttonsArray = new Array();

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
                ${TextTruncator(displayText,13)}
                </div>
                </div>
                `;

    button.innerHTML = text;
    left_container.appendChild(button);
    buttonsArray.push(button);
});


function getTreshold() {

    
    let tempDiv = document.createElement("div");
   
    let el = document.querySelector(".img-text-container");

    let style = window.getComputedStyle(el, null).getPropertyValue('font-size');
    tempDiv.style.overflow="hidden";
    let fontSize = parseFloat(style);


    tempDiv.style.width = "220px";
    tempDiv.style.fontSize = fontSize+"px";

    let style2 = window.getComputedStyle(el, null).getPropertyValue('max-width');
    let maxWidth = parseFloat(style2);

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

        // console.log("new width ", tempDiv.scrollWidth);
        // console.log("new Height ", tempDiv.clientHeight);
        // console.log(tempDiv.innerText);
    }

    document.body.removeChild(tempDiv);

    return treshold;
    
}



let curButton=0,numButtons = buttonsArray.length;


function displayImageForButton(index){
    let right_img = document.querySelector(".right-image");
    right_img.setAttribute("src" , ImagesArray[index].previewImage);

    let caption_txt = document.getElementById("caption");

    caption_txt.value = (ImagesArray[index].title);

    buttonsArray[index].querySelector(".img-text-container").innerHTML
             = TextTruncator(ImagesArray[index].title,getTreshold());

    
}

displayImageForButton(0);
buttonsArray[0].focus();

buttonsArray.forEach( (button,index) => {
    button.addEventListener( "click" , () => {

        buttonsArray[curButton].style.backgroundColor="white"; 

        curButton = index;

        buttonsArray[curButton].style.backgroundColor="#0AA1DD";
        displayImageForButton(curButton);


    })
} );

buttonsArray.forEach((button,index) => {
    button.addEventListener("keydown" , (event) => {

        event.preventDefault();

        console.log("PrevButton " , curButton);
        curButton = index;  

        buttonsArray[curButton].style.backgroundColor = "white";
        if(event.key == "ArrowUp"){
          curButton = (curButton-1)%numButtons;
          if(curButton<0) curButton+=numButtons;
        }

        else if(event.key == "ArrowDown" || event.key=="Tab"){
           curButton = (curButton+1)%numButtons;
           if(curButton<0) curButton+=numButtons;
        }
        

        console.log("curButton " , curButton);
        console.log("key " , event.key);

        let buttonNo = `button-${curButton}`;

        document.getElementById(buttonNo).focus(); 
        displayImageForButton(curButton); 
        buttonsArray[curButton].style.backgroundColor="#0AA1DD";

    });
});

let img_caption = document.getElementById("caption");

img_caption.addEventListener( "input" , (event) => {
    let newText = event.target.value;

    let textField = buttonsArray[curButton].querySelector(".img-text-container");
   
    textField.innerText = TextTruncator(newText,getTreshold());

    ImagesArray[curButton].title = (newText);  
} );
