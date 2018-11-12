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
    // //game库的接口
    // export function request(url:string, postData:Object, method:string, comCallback:Function, errCallback:Function):void {
    //     let cmpostdata = "";
    //     for (let key in postData) {
    //         cmpostdata += key + "=" + postData[key] + "&";
    //     }
    //     if (cmpostdata != "") {
    //         cmpostdata = cmpostdata.substr(0, cmpostdata.length - 1);
    //     }
    //     let loader:egret.URLLoader = new egret.URLLoader();
    //     loader.addEventListener(egret.Event.COMPLETE, function () {
    //         let jsonObj = JSON.parse(loader.data);
    //         comCallback(jsonObj);
    //     }, this);
    //     loader.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
    //         errCallback();
    //     }, this);
    //     let request:egret.URLRequest = new egret.URLRequest(url);
    //     request.method = method;
    //     request.data = new egret.URLVariables(cmpostdata);
    //     loader.load(request);
    // }

    // function getRequestUrlTail(params: ObjectURLOptions) {
    //     var segment = [];
    //     for (let key in params) {
    //         let value = params[key];
    //         segment.push(key + "=" + encodeURIComponent(value) + "&");
    //     }
    //     segment.sort();
    //     let argStr = segment.join('');
    //     argStr = argStr.substr(0, argStr.length - 1);
    //     return argStr;
    // }

    // //core库的接口
    // export function sendPost(baseurl: string, params: Object, respHandler: Function, target: any) {
    //     let request: egret.HttpRequest = new egret.HttpRequest();
    //     request.responseType = egret.HttpResponseType.TEXT;
    //     request.once(egret.Event.COMPLETE, respHandler, target);
    //     request.once(egret.IOErrorEvent.IO_ERROR, respHandler, target);
    //     request.open(baseurl, egret.HttpMethod.POST);
    //     request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     request.send(getRequestUrlTail(params));
    // }

    // export function sendGet(baseurl: string, params: Object, respHandler: Function, target: any){
    //     let request = new egret.HttpRequest();
    //     request.responseType = egret.HttpResponseType.TEXT;
    //     let url = baseurl;
    //     if(params){
    //         url = baseurl + "?" + getRequestUrlTail(params);
    //     }
    //     request.open(url, egret.HttpMethod.GET);
    //     request.once(egret.Event.COMPLETE, respHandler, target);
    //     request.once(egret.IOErrorEvent.IO_ERROR, respHandler, target);
    //     request.send();
    // }

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