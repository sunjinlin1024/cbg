module NJson{
    function assert(v,msg){
        if(v==null||v==undefined){
            console.error(msg)
        }
    }

    //Scans a JSON string skipping all whitespace from the current start position.
    //Returns the position of the first non-whitespace character, or nil if(the whole } of string is reached.
    //@param s The string being scanned
    //@param startPos The starting position where we should begin removing whitespace.
    //@return int The first position where non-whitespace was encountered, or s.length+1 if(the } of string
    //was reached.
    function decode_scanWhitespace(s:string,startPos:number){
        let whitespace=" \n\r\t"
        let code:string
        while (startPos<=s.length&&whitespace.indexOf(s.charAt(startPos))>=0){
            // string.find(whitespace, s.substr(startPos,startPos), 1, true)  and startPos <= s.length) do
            startPos = startPos + 1
        }
        return startPos
    }
    
    export function decode(s:string, startPos=0){

        startPos = decode_scanWhitespace(s,startPos)
        assert(startPos<s.length, 'Unterminated JSON encoded object found at position in [' + s + ']')
        // console.log(s.substr(startPos,40))
        let substr1=s.charAt(startPos)
        if(substr1=="{"){
            return decode_scanObject(s,startPos) 
        }else if(substr1=="["){
            return decode_scanArray(s,startPos)
        }else if("+-0123456789.e".indexOf(substr1)>=0){
            return decode_scanNumber(s,startPos)
        }else if(substr1=='\"' || substr1=='\''){
            return decode_scanString(s,startPos)
        }else if('/*'==substr1){
            return decode(s, decode_scanComment(s,startPos))
        }else{
            return decode_scanConstant(s,startPos)
        }
    }

    function checkIsMap(s:string,startPos):boolean{
        let i=startPos
        let char:string
        let char2:string
        for(;i<s.length;i++){
            char=s.charAt(i)
            if(char==':'){
                return true
            }
            if(char=='"'){
                for(let j=i+1;j<s.length;j++){
                    if(s.charAt(j)==char){
                        i=j
                        break
                    }
                }
            }
            if(i<s.length-1){
                char2=s.charAt(i+1)
                if(char=="("&&char2=="["||char=="]"&&char2==")"){
                    return false
                }
            }
        }
        return false
    }

    function decode_scanObject(s:string,startPos:number):any{
        let obj = {}
        let key:string
        let value:any
        assert(s.charAt(startPos)=="{","decode_scanObject called but object does not start at position " + startPos + " in string:\n" + s)
        startPos = startPos + 1
        while(true){
            startPos = decode_scanWhitespace(s,startPos)
            assert(startPos<s.length-1, 'JSON string end unexpectedly while scanning object.')
            let curChar = s.charAt(startPos)
            if(curChar=='}'){
                return [obj,startPos+1]
            }
            if(curChar==','){
                startPos = decode_scanWhitespace(s,startPos+1)
            }
            assert(startPos<s.length, 'JSON string end unexpectedly scanning object.')
            //Scan the key
            let result=decode(s,startPos)
            key=result[0]
            startPos = result[1]
            assert(startPos<s.length, 'JSON string end unexpectedly searching for value of key ' + key)
            startPos = decode_scanWhitespace(s,startPos)
            assert(startPos<s.length, 'JSON string end unexpectedly searching for value of key ' + key)
            assert(s.charAt(startPos)==':','JSON object key-value assignment mal-formed at ' + startPos)
            startPos = decode_scanWhitespace(s,startPos+1)
            assert(startPos<s.length, 'JSON string end unexpectedly searching for value of key ' + key)
            result=decode(s,startPos)
            value = result[0]
            startPos = result[1]
            obj[key]=value
        }	//infinite loop while key-value pairs are found
    }

    

    function decode_scanArray(s:string,startPos:number){
        let array =[]	//The return value
        assert(s.charAt(startPos)=="[",'decode_scanArray called but array does not start at position ' + startPos + ' in string:\n'+s )
        startPos = startPos + 1
        //Infinite loop for array elements
        while(true){
            startPos = decode_scanWhitespace(s,startPos)
            assert(startPos<s.length,'JSON String end unexpectedly scanning array.')
            let curChar = s.charAt(startPos)
            if(curChar==']'){
                return [array, startPos+1]
            }
            if(curChar==','){
                startPos = decode_scanWhitespace(s,startPos+1)
            }
            assert(startPos<s.length, 'JSON String end unexpectedly scanning array.')
            let result=decode(s,startPos)
            startPos = result[1]
            array.push(result[0])
            
        }
    }
            
    function decode_scanComment(s:string, startPos:number){
        assert( s.substr(startPos,2)=='/*', "decode_scanComment called but comment does not start at position " + startPos)
        let endPos = s.indexOf('*/',startPos+2)
        assert(endPos>=0, "Unterminated comment in string at " + startPos)
        return endPos+2
    }

    function decode_scanConstant(s:string, startPos:number){
        let consts = { "true" : true, "false" : false, "null" : 'null' }
        let constNames = ["true","false","null"]
        for(let k of constNames){
            // --print ("[" + s.substr(startPos, startPos + string.len(k) -1) +"]", k)
            if(s.substr(startPos, startPos + k.length -1 )==k){
                return [consts[k], startPos + k.length]
            }
        }
        assert(null, 'Failed to scan constant from string ' + s + ' at starting position ' + startPos)
    }

    function decode_scanNumber(s:string, startPos:number){
        let endPos = startPos+1
        let acceptableChars = "+-0123456789.e"
        while (endPos<s.length&&acceptableChars.indexOf(s.charAt(endPos))>=0){
            endPos = endPos + 1
        }
        let value = Number(s.substr(startPos, endPos-startPos))
        assert(value!=null, 'Failed to scan number [ ' + value + '] in JSON string at position ' + startPos + ' : ' + endPos)
        return [value, endPos]
    }

    function decode_scanString(s:string, startPos:number){
        assert(startPos, 'decode_scanString(+) called without start position')
        let startChar = s.substr(startPos,1)
        assert(startChar=='\'' || startChar=='\"','decode_scanString called for a non-string')
        let escaped = false
        let endPos = startPos + 1
        let bEnded = false
        do{
            let curChar = s.substr(endPos,1)
            if(!escaped){
                if(curChar=='\\'){
                    escaped = true
                }else{
                    bEnded = curChar==startChar
                }
            }else{
                //if(we're escaped, we accept the current character come what may
                escaped = false
            }
            endPos = endPos + 1
            assert(endPos <= s.length, "String decoding failed: unterminated string at position " + endPos)
        }while(!bEnded)
        // let stringValue = 'return ' + s.substr( startPos, endPos-1)
        // let stringEval = base.loadstring(stringValue)
        let stringValue=s.substr( startPos+1, endPos-startPos-2)
        assert(stringValue, 'Failed to load string [ ' + stringValue + '] in JSON4Lua.decode_scanString at position ' + startPos + ' : ' + endPos)
        return [stringValue, endPos]
    }


        function encodeString(s:string){
            s = s.replace(/\\/g,'\\\\')
            s = s.replace(/\"/g,'\\"')
            s = s.replace(/\'/g,"\\'")
            s = s.replace(/\n/g,'\\n')
            s = s.replace(/\t/g,'\\t')
            return s
        }

            // function isArray(t)
            // //Next we count all the elements, ensuring that any non-indexed elements are not-encodable
            // //(with the possible exception of 'n')
            // let maxIndex = 0
            // for k,v in base.pairs(t) do
            //     if((base.type(k)=='number' and math.floor(k)==k and 1<=k)){	//k,v is an indexed pair
            //     if((not isEncodable(v))){ return false }	//All array elements must be encodable
            //     maxIndex = math.max(maxIndex,k)
            //     else
            //     if((k=='n')){
            //         if(v ~= table.getn(t)){ return false }  //False if(n does not hold the number of elements
            //     else //Else of (k=='n')
            //         if(isEncodable(v)){ return false }
            //     }  //End of (k~='n')
            //     } //End of k,v not an indexed pair
            // }  //End of loop across all pairs
            // return true, maxIndex
            // }

            //Determines whether the given Lua object / table / variable can be JSON encoded. The only
            //types that are JSON encodable are: string, boolean, number, nil, table and json.null.
            //In this implementation, all other types are ignored.
            //@param o The object to examine.
            //@return boolean True if(the object should be JSON encoded, false if(it should be ignored.
            // function isEncodable(o)
            // let t = base.type(o)
            // return (t=='string' or t=='boolean' or t=='number' or t=='nil' or t=='table') or (t=='function' and o==null)
            // }

}