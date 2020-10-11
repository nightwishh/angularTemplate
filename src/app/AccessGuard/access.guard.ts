import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private cookie:CookieService, private router:Router) {

  }
  canActivate(route:ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiresLogin = route.data.requiresLogin || false;
    const requiresLogout = route.data.requiresLogout || false;
    if (requiresLogin) {
      // Check that the user is logged in...
      if (this.userLoggedIn())
      return true;
      else return this.router.parseUrl("/Login");
    }
    if (requiresLogout) {
      if (!this.userLoggedIn())
        return true;
      else
        return this.router.parseUrl("/");
    }
    return true;
  }

  userLoggedIn() {
    if (this.cookie != null && this.cookie.get("accessToken"))
      return true;
    else
      return false;
  }
}

