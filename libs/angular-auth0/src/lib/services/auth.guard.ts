import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private readonly auth: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.isAuthenticated().pipe(
            mergeMap(isAuthenticated => this.handleIsAuthenticated(isAuthenticated))
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.isAuthenticated().pipe(
            mergeMap(isAuthenticated => this.handleIsAuthenticated(isAuthenticated))
        );
    }

    private handleIsAuthenticated(isAuthenticated: boolean): Observable<boolean> {
        if (isAuthenticated) {
            return of(true);
        }

        return this.auth.loginWithRedirect().pipe(map(() => false));
    }
}
