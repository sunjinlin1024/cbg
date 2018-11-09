module stringUtil{
    export function expandStr(str:string,length:number){
        if(length>str.length){
            return str+new Array(length-str.length).join(" ")
        }else if(length<str.length){
            return str.substr(0,length)
        }
        return str
    }
}