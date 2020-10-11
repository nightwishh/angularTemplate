import { CanActivate, CanDeactivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { AppInjector } from './appinjector';
import { UserRegistration } from '../modules/models/user.model';

// import {InjectorInstance} from './app.module';
export class bxWorkgroup {
     public get ID():number {
        var commonService = AppInjector.get(CommonService);
        return Number(commonService.getCookie("bxWgID"));
     };
     public set ID(value:number) {
        var commonService = AppInjector.get(CommonService);
        commonService.setCookie("bxWgID",Number(value));
     };
     name:string;
     numberOfMembers:number;
     subjectName:string;
     ownerID:Number;
     users:bxWgUsers[] = [];
     public get active():Boolean {
         return (this.ID != null && this.ID > 0)
     }
     public onWorkGroupChange:Function[] = [];
}
export class bxWgUsers {
    public ID:number;
    public name:string;
    public role:string;
}
export class Authuser {
    public static fullName:string;
    public static get token():string {
        var commonService = AppInjector.get(CommonService);
        return commonService.getCookie("at").toString();
    }
    public static get bxToken():string {
        var commonService = AppInjector.get(CommonService);
        return commonService.getCookie("bxat").toString();
    }
    public static get bxUserID():number {
        var commonService = AppInjector.get(CommonService);
        return Number(commonService.getCookie("bxID"));
    };
    public static workgroup:bxWorkgroup = new bxWorkgroup();

    public static modules:Module[];
    public static isAdmin:boolean = null;
    static deactivateWorkgroup() {
        this.workgroup = new bxWorkgroup();
    }

   static checkUser() {
        return this.token.length > 0  // if someone is logged in Go ahead. if not redirect to login
    }
    static checkBxUser() {
        return this.bxToken.length > 0  // if someone is logged in Go ahead. if not redirect to login
    }

   static userLoggedIn() {
        return this.checkUser();
    }

    static bxUserLoggedIn() {
        return this.checkBxUser();
    }

   static getUserData(onSuccess:Function = null, forceGet:boolean = false) {

        if (this.token.length == 0) return;
        if (Authuser.fullName && Authuser.fullName.length > 0 && !forceGet) {
            onSuccess(Authuser);
            return;
        }

        var commonService = AppInjector.get(CommonService);
        commonService.post("Users/GetUserData",null, 
        (data) => {
            Authuser.fullName = data.DATA.userData.fullName;
            if (data.DATA.bx_data != null && data.DATA.bx_data.access_token != null)
            {
                commonService.setBXToken(data.DATA.bx_data.access_token);
            }
            if (Authuser.bxUserID > 0) {}
            else this.getBxUserData();
            
            if (onSuccess != null) onSuccess(data.DATA.userData);

        }, (err) => {
            commonService.clearCookies();
            location.reload();
        },false);
    }

    static getBxUserData() {
        if (this.bxToken.length == 0) return;

        var commonService = AppInjector.get(CommonService);
        commonService.getBX("user.current",{},(data) => {
            commonService.setCookie("bxID",data.result.ID);
        });

    }

    static getUserModules() {
        if (this.token.length == 0) return;
        
        var commonService = AppInjector.get(CommonService);
        commonService.post("Users/GetUserModules",null, 
        (data) => {
            Authuser.modules = data.DATA;
        });

    }

    static logout() {
        var commonService = AppInjector.get(CommonService);
        commonService.post("Users/Logout",null, (d) => {
            commonService.clearCookies();
            location.reload();
        },null,true,false)
    }

}
export class Module {
    public ID:number;
    public moduleName:string;
    public moduleNameEn:string;
    public iconName:string;
    public iconType:string;
    public url:string;
}
export class UserData extends UserRegistration {
    
}