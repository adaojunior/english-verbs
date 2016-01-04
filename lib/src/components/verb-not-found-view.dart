import 'package:angular2/angular2.dart' show Component;
import 'package:angular2/router.dart' show RouteParams;
import 'package:usage/usage.dart' show Analytics;

@Component(
    selector: 'verb-not-found',
    template: '''
      <div class="message">{{message}}</div>
    ''',
    styles: const [
      '''
        .message{
          text-align: center;
          padding-top: 50px;
          color: rgba(0,0,0,.4);
        }
      '''
    ]
)
class VerbNotFoundView {

  String message = 'Your search did not match any verbs.';

  VerbNotFoundView(RouteParams params,Analytics analytics){
    if(params.params.containsKey('search')){
      this.message = "Your search - ${params.get('search')} -did not match any verbs.";
    }
    analytics.sendScreenView('PageNotFound::${params.get('search')}');
  }
}
