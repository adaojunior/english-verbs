import 'package:angular2/angular2.dart' show Component, OnInit;
import 'package:angular2/router.dart' show RouteConfig, Route, ROUTER_DIRECTIVES, RouteParams, Router;
import 'src/components/search-input.dart';
import 'src/components/conjugation-view/conjugation-view.dart';
import 'src/components/verb-not-found-view.dart';
import 'package:usage/usage.dart' show Analytics;
import 'dart:html' show window;

@Component(
    selector: 'app',
    directives: const [SearchInput,ROUTER_DIRECTIVES],
    template: '''
    <nav class="toolbar">
      <search-input (onChange)="onSubmit(\$event)"></search-input>
    </nav>
    <router-outlet></router-outlet>
  ''',
  styles: const [
    '''
      .toolbar {
          background-color: #00796B;
          padding: 10px 0;
      }
    '''
  ]
)
@RouteConfig(const [
  const Route(path: '/', component: ConjugationView, name: 'ConjugationView', useAsDefault: true),
  const Route(path: '/verb/:verb', component: ConjugationView, name: 'ConjugationView'),
  const Route(path: '/verb-not-found', component: VerbNotFoundView, name: 'VerbNotFoundView')
])
class AppComponent {

  Router _router;
  Analytics _analytics;

  AppComponent(this._router,Analytics analytics){
    analytics.sendEvent('page-load','initial-load',label: window.location.pathname);
  }

  onSubmit(String value){
    value = value.trim().toLowerCase();
    if(value.length > 0){
      _router.navigate(['ConjugationView',{'verb':value}]);
      _analytics.sendEvent('search','verb-search',label: value);
    }
  }
}
