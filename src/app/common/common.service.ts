import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { LoginCredentials, Registration } from '../models/user.model';
// import { UserRegistration, UserCredentials } from '../modules/header/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient, private cookie:CookieService) { 
  }
  get baseUrl():string {
    if (location.href.includes("localhost")) {
    // return "https://apiants.azurewebsites.net/";;
    return "https://localhost:5001/";
    }
    else 
    return "https://abcd.com/";
    // return "http://antsge-001-site1.ctempurl.com/";
  };
  
  private httpOptions:Object = {};
  private headers;
  initHeaders() {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8',
                                    'Authorization': "Bearer " + this.getCookie("at")
  });
    this.httpOptions = {
      headers:this.headers,
      reportProgress:true,
      responseType: 'application/json' as 'application/json'
    }
  }

  setCookie(name,value) {
    this.cookie.set(name,value,null,"/");
  }
  setCookieExpire(name,value,date:Date) {
    this.cookie.set(name,value,date,"/");
  }
  getCookie(name):string {
    return this.cookie.get(name);
  }
  removeCookie(name) {
    this.cookie.delete(name,"/");
  }
  updateCookie(name,value) {
    this.removeCookie(name);
    this.setCookie(name,value);
  }
  clearCookies() {
    this.cookie.deleteAll();
  }

  redirectToHome() {
    if (window.location.pathname.toString() != "/" && window.location.pathname.toString() != "/Home" && window.location.pathname.toString() != "")
    window.location.href = "/"
  }

  handleErrors(err) {
    try {
      var error = JSON.parse(err.error);
    }
    catch {
      var error = err.error;
    }

    if (error.STATUS.ID == -5) { // You are not authorized. please authorize first
      //this.redirectToLogin();
    }
    if (error.STATUS.ID == -6) { // Token incorrect. Destroy cookies
      this.clearCookies();
      window.location.href = "/";
    }

    if (error.STATUS.ID < 0 && error.STATUS.ID != -5 && error.STATUS.ID != -6)
    alert(error.STATUS.TEXT);
  }

  post(url:string, params:any = null, fnSuccess:Function = null,fnError:Function = null, showLoading:boolean = true, responseTypeJson:boolean = true) {
    this.httpOptions = this.getHttpOptions();
    if (showLoading)
      this.requestLoader(true);

    var baseUrl = this.baseUrl;
    if (url.includes("http") || url.includes("https")) baseUrl = "";

    this.http.post(baseUrl + url,JSON.stringify(params),this.httpOptions).subscribe((response:any) => {
      if (showLoading)
        this.requestLoader(false);
      var data = response;
      if (responseTypeJson) {
        try {
          var json = JSON.parse(response);
        }
        catch {
          var json = response;
        }
        if (json.rootElement == null)
        data = json;
        else
        data = json.rootElement;
      }
      if (fnSuccess != null) 
        fnSuccess(data);
    }, (err) => {
      if (showLoading)
        this.requestLoader(false);
      console.log("Error: " + err);
      this.handleErrors(err);
      if (fnError != null)
        fnError(err);
    });
  }
  getHttpOptions(params:any = {}):Object {
    this.initHeaders();
    var httpOptions = {
      headers:this.headers,
      reportProgress:true,
      // responseType: 'application/json' as 'application/json',
      params:params
    }
    return httpOptions;
  }
  get(url:string, params:any = null, fnSuccess:Function = null,fnError:Function = null, showLoading:boolean = true) {
    // this.initHeaders();
    this.httpOptions = this.getHttpOptions();
    this.http.get(this.baseUrl + url,this.httpOptions).subscribe((response) => {
      // console.log(response);
      if (fnSuccess != null)
        fnSuccess(response);
    }, (err) => {
      console.log("Error: " + err);
      this.handleErrors(err);
      if (fnError != null)
        fnError(err);
    });
  }
  authenticate(url,userCredentials:LoginCredentials) {
    this.post(url,userCredentials,(res) => {
      // console.log(res);
      // var data = JSON.parse(res).rootElement;
     var token = res.DATA.access_token;
     this.setToken(token);
    });
  }
  register(url,userRegistration:Registration) {
    this.post(url,userRegistration,(res) => {
      // var data = JSON.parse(res).rootElement;
      var token = res.DATA.access_token
      this.setToken(token);
  
    });
  }

  setToken(token:string) {
    var dt = new Date();
    dt.setDate(90);
    this.setCookieExpire("at",token,dt);
    location.reload();
  }

  requestLoader(show:boolean = true) {
    if (show) {
      if (!document.getElementsByClassName("request-modal-loader")[0].classList.contains("show"))
           document.getElementsByClassName("request-modal-loader")[0].classList.add("show");
    }
    else
      if (document.getElementsByClassName("request-modal-loader")[0].classList.contains("show"))
          document.getElementsByClassName("request-modal-loader")[0].classList.remove("show");

  }

  copyToClipboard(val: string) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
}
