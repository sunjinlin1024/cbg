
class BaseModel implements IModel{
    
    
    public get(key:string):any{
        return this[key]
    }

    public getNum(key:string):number{
        if(!this[key]){
            return 0
        }
        return Number(this[key])
    }

    public getStr(key:string):string{
        if(!this[key])return ""
        return this[key]
    }

    public initByData(data:any){
        if(!data)return
        for(let key in data){
            this[key]=data[key]
        }
    }
    
}