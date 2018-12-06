//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////



interface Player{
    id:number;
    name:string;
}



class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        if(this.stage){
            this.onAddToStage(null)
        }else{
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }

    
    

    private onResize(evt:egret.Event){
        let scale=Math.min(this.stage.stageWidth/this.designWidth,this.stage.stageHeight/this.designHeight)
        this.scaleX=this.scaleY=scale
        if(evt){
            game.dispatchEvent(evt)
        }
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this)
        this.onResize(null)
        this.stage.addEventListener(egret.Event.RESIZE,this.onResize,this);
        
         egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();//此处如此处理，防止小游戏报错
            // if(game.audioManager){
            //     game.audioManager.setSoundAble(false, AUDIO_ABLE_FLAG.BACK_GROUND)
            //     game.audioManager.pauseMusic(AUDIO_PAUSE_FLAG.BACK_GROUND)
            // }
            game.dispatchEvent(new GameEvent(GameEvent.ON_GAME_PAUSE))
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();//此处如此处理，防止小游戏报错
            // if(Game.audioManager){
            //     Game.audioManager.setSoundAble(true, AUDIO_ABLE_FLAG.BACK_GROUND)
            //     Game.audioManager.resumeMusic(AUDIO_PAUSE_FLAG.BACK_GROUND)
            // }
            game.dispatchEvent(new GameEvent(GameEvent.ON_GAME_RESUME))
        }

        //注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.runGame().catch(e => {
            console.error(e);
        });
    }

    private async runGame() {
        await this.loadResource()
        await platform.login();
        const userInfo = await platform.getUserInfo();
        game.init(this)
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    public get designWidth():number{
        return 1280
    }

    public get designHeight():number{
        return 720
    }

    public get relativeWidth():number{
        return this.stage.stageWidth/this.scaleX
    }

    public get relativeHeight():number{
        return this.stage.stageHeight/this.scaleY
    }
}