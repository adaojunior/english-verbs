import 'package:angular2/angular2.dart'
    show Component, OnInit, ViewEncapsulation;
import 'package:angular2/router.dart'
    show RouteConfig, Route, ROUTER_DIRECTIVES, RouteParams, Router;
import 'src/components/search_input.dart';
import 'src/components/conjugation_view/conjugation_view.dart';
import 'src/components/verb_not_found_view.dart';
import 'package:usage/usage.dart' show Analytics;
import 'dart:html' show window;

@Component(
    selector: 'app',
    directives: const [SearchInput, ROUTER_DIRECTIVES],
    encapsulation: ViewEncapsulation.None,
    template: '''
    <nav class="toolbar">
      <search-input (onChange)="onSubmit(\$event)"></search-input>
    </nav>
    <router-outlet></router-outlet>
  ''')
@RouteConfig(const [
  const Route(
      path: '/',
      component: ConjugationView,
      name: 'ConjugationView',
      useAsDefault: true),
  const Route(
      path: '/verb/:verb', component: ConjugationView, name: 'ConjugationView'),
  const Route(
      path: '/verb-not-found',
      component: VerbNotFoundView,
      name: 'VerbNotFoundView')
])
class AppComponent {
  Router _router;
  Analytics _analytics;

  AppComponent(this._router, this._analytics) {
    _analytics.sendEvent('page-load', window.location.pathname);
    _registerRef();
    window.addEventListener('beforeinstallprompt', _beforeInstallPrompt);
  }

  _beforeInstallPrompt(e) =>
      _analytics.sendEvent('Homescreen installation', 'beforeinstallprompt');

  _registerRef() {
    if (Uri.base.queryParameters.containsKey('ref')) {
      _analytics.sendEvent('Page', 'reference',
          label: Uri.base.queryParameters['ref'], value: 1);
    }
  }

  onSubmit(String value) {
    value = value.trim().toLowerCase();
    if (value.length > 0) {
      _router.navigate([
        'ConjugationView',
        {'verb': value}
      ]);
      _analytics.sendEvent('Search', 'verb', label: value, value: 1);
    }
  }
}
