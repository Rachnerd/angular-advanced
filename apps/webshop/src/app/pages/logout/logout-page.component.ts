import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@angular-advanced/auth';
import { Router } from '@angular/router';
import { MainTemplateComponent } from '@angular-advanced/ui-components/main-template/main-template.component';
import { delay, first, map, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [MainTemplateComponent],
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.scss',
})
export class LogoutPageComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    timer(300)
      .pipe(
        switchMap(() => this.auth.isAuthenticated$),
        first(),
        switchMap((isAuthenticated) =>
          this.auth.logout().pipe(map(() => isAuthenticated)),
        ),
        delay(2000),
      )
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          location.reload();
        } else {
          this.router.navigate(['/']);
        }
      });
  }
}
