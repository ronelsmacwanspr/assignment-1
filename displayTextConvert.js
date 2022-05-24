
const TextTruncator = function displayTextConvert(toReplace , treshold){


  //  console.log(treshold);
    console.log("toReplace ", toReplace);
    console.log("treshold " , treshold);
    
   
    if(toReplace.length <= treshold){
       
        return toReplace;
    }
    let resStr="";

    let totChar = toReplace.length;
    
    //console.assert(totChar > treshold , "Entire length consumed");
    

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

export default TextTruncator;
