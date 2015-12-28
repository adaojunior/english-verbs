import 'package:angular2/angular2.dart' show Component, View, NgFor, NgClass;
import 'package:angular2/router.dart' show RouteParams, Router;
import 'package:english-verbs/app.services.dart' show ConjugationService, Conjugation, Tense, Person, Plurality, Time;
import 'package:usage/usage.dart' show Analytics;

@Component(
    selector: 'conjugation-view',
    templateUrl: 'conjugation-view.html',
    styleUrls: const ['conjugation-view.css'],
    directives: const [NgFor,NgClass],
    providers: const [ConjugationService]
)
class ConjugationView {

    RouteParams _params;
    Router _router;
    ConjugationService _conjugator;
    List _data;
    String infinitive;
    Tense _tense;
    Conjugation _conjugation;

    List tenses = [
        {'value': 'Simple','enum': Tense.Simple},
        {'value': 'Progressive','enum': Tense.Progressive},
        {'value': 'Perfect','enum': Tense.Perfect},
        {'value': 'Perfect-Progressive','enum': Tense.PerfectProgressive},
    ];

    get data => _data;

    Tense get tense => this._tense;

    set tense (Tense tense){
        this._tense = tense;
        this._data = _conjugation.getConjugationTable(tense);
    }

    ConjugationView(this._params, this._router,this._conjugator, Analytics analytics){
        if(_params.get('verb') == null)
            _router.navigate(['ConjugationView',{'verb':'be'}]);
        else
            _boot();

        analytics.sendScreenView('Conjugation');
    }

    _boot(){
        try {
            _conjugation = _conjugator.find(_params.get('verb'));
            this.infinitive = _conjugation.infinitive;
            tense = Tense.Simple;
        }
        catch(e){
            _router.navigate(['VerbNotFoundView',{'search':_params.get('verb')}]);
        }
    }
}
