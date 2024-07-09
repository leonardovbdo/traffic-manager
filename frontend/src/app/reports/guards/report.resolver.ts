import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { ReportService } from "../services/report.service";
import { Report } from "../models/report";

/**
 * Resolver for fetching individual report details before navigating to a route.
 * Retrieves report details using ReportService based on the ID parameter from ActivatedRouteSnapshot.
 * If no ID is provided in the route parameters, returns an empty report object.
 */
@Injectable({
  providedIn: 'root'
})
export class ReportResolver {

  constructor(private service: ReportService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Report> {

    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({ 
      id: null,
      title: null,
      description: null,
      location: null,
      typeReport: null,
      street: null,
      dateTime: null,
      userEmail: null,
      latitude: null,
      longitude: null
    });
  }
}
