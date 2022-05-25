
const TextTruncator = function displayTextConvert(toReplace , treshold){

    if(toReplace.length <= treshold){
       
        return toReplace;
    }
    let resStr="";

    let totChar = toReplace.length;
    
    let toRem = totChar - treshold;

    let mid = Math.floor(totChar/2);
    --toRem;

    let cut1 = Math.floor(toRem/2) , cut2 = Math.ceil(toRem/2);

    resStr = toReplace.slice(0,mid-cut1) + ".." + toReplace.slice(mid+cut2,totChar);

    return resStr;

}

export default TextTruncator;
