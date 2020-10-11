import { Router, ActivatedRoute } from '@angular/router';

export class CommonFunctions {
    private static timeoutInterval:number = 0;
    private static keypressTimer = null;
    timeoutAfterKeyPress(timeout:number, func:Function) {
        clearTimeout(CommonFunctions.keypressTimer);
        CommonFunctions.timeoutInterval = timeout;
        CommonFunctions.keypressTimer = setTimeout(() => {
          func();
        }, CommonFunctions.timeoutInterval);
    }
    clearUrlParameters(router:Router, route:ActivatedRoute, withoutReload:boolean = false) {
      var baseUrl = route.snapshot.url[0].path;
      // this.router.navigateByUrl()
      setTimeout(() => {
        if (withoutReload)
        window.history.replaceState({},"",baseUrl);
        else
        router.navigate(["/" + baseUrl])
      }, 100);
    }
}
