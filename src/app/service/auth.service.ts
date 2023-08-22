import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject, Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  public authenticated: boolean = false;

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (!this.authenticated) {
      alert('No permission');
      this.logout();
    } else {
      return true
    }
  }

  loggedIn() {
   this.authenticated = true;
   this.router.navigateByUrl('tickets')
  }

  logout() {
    this.authenticated = false;
    this.router.navigate(['/'])
  }
}
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthenticationService).canActivate(next, state);
}
