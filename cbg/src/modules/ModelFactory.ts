module factory{
    export function createModelByData(data:any):BaseItemModel{
        let model:BaseItemModel;
        let kindid=data[Const.KEY_KINDID]
        switch(kindid){
            case Const.Kind.COIN:
                model=new CoinModel()
                return
        }
        return model
    }
}