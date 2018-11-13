module HttpUtil {
    export function http(url:string,param?:Object,method:string="GET",header?:Object,success?:Function,fail?:Function){
        let request=new XMLHttpRequest()
        request.timeout=3000
        request.withCredentials=true
        request.onload=()=>{
            if(request.readyState!=4)return
            if(request.status==200||request.status==304){
                if(success)success(request.response)
            }else{
                if(fail)fail(request.status)
            }
        }
        request.onerror=msg=>{
            if(fail)fail(msg)
        }
        request.ontimeout=()=>{
            if(fail)fail("timeout")
        }
        let fullUrl=url
        if(method=="GET"){
            if(param){
                fullUrl+="?"
                for(let key in param){
                    fullUrl+=key+"="+param[key]+"&"
                }
                fullUrl=fullUrl.substr(0,fullUrl.length-1)
            }
        }
        if(DEBUG){
            fullUrl="resource/cbg/role_list.txt"
            header=null
        }
        request.open(method,fullUrl,true)
        if(header){
            for(let key in header){
                request.setRequestHeader(key,header[key])
            }
        }
        if(method=="GET"){
            request.send()
        }else{
            let formData=new FormData()
            if(param){
                for(let key in param){
                    formData.append(key,param[key])
                }
            }
            request.send(formData)
        }
    }

    export function getAllServerRoleParam(pageIndex:number,maxPrice:number=5000,pageCount=30){
        let param={
            // "callback":"Request.JSONP.request_map.request_0",
            "_":Math.random(),
            "act":"recommd_by_role",
            "price_max":maxPrice*100,
            "search_type": "overall_search_role",
            "server_type":"3",
            "page":pageIndex,
            "query_order":"selling_time%20DESC",
            "view_loc":"overall_search",
            "kindid":Const.Kind.ROLE,
            "count":pageCount      
        }
        return param
    }

    export function getServerRoleParam(serverId:number,pageIndex:number,pageCount=30){
        return {
            // "callback":"Request.JSONP.request_map.request_0",
            "_":Math.random(),
            "act":"recommd_by_role",
            "server_id": serverId,
            "server_name": encodeURI(config.server[serverId].name),
            "areaid":config.server[serverId].area_id,
            "page":pageIndex,
            "query_order":"selling_time%20DESC",
            "view_loc":"equip_list",
            "kindid":Const.Kind.ROLE,
            "count":pageCount      
        }
    }
}