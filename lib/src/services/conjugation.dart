library app.src.services.conjugation;

import 'package:angular2/angular2.dart' show Injectable;
import 'verbs.dart';

bool _isFirstPerson(Person p) => p == Person.First;
bool _isSecondPerson(Person p) => p == Person.Second;
bool _isThirdPerson(Person p) => p == Person.Third;
bool _isSingular(Plurality p) => p == Plurality.Singular;
bool _isPlural(Plurality p) => p == Plurality.Plural;

enum Tense { Simple, Progressive, Perfect, PerfectProgressive }

enum Time { Present, Past, Future, Conditional }

enum Person { First, Second, Third }

enum Plurality { Singular, Plural }

_SimpleTenseOfBe(Time time, Person person, Plurality plurality) {
  bool isFirst = _isFirstPerson(person);
  bool isSecond = _isSecondPerson(person);
  bool isThird = _isThirdPerson(person);
  bool isSingular = _isSingular(plurality);
  bool isPlural = _isPlural(plurality);

  if (time == Time.Present) if (isFirst && isSingular) return "am";
  else return (isFirst || isSecond || isThird && isPlural) ? "are" : "is";
  else if (time == Time.Past) return (isFirst && isSingular ||
      isThird && isSingular) ? "was" : "were";
  else if (time == Time.Future) return "will be";
  else if (time == Time.Conditional) return "would be";
}

String _SimpleTenseOfHave(Time time, Person person, Plurality plurality) {
  if (time == Time.Present) return (_isThirdPerson(person) &&
      _isSingular(plurality)) ? "has" : "have";
  else if (time == Time.Past) return "had";
  else if (time == Time.Future) return "will have";
  else return "would have";
}

abstract class Conjugation {
  get infinitive;

  get(Tense tense, Time time, Person person, Plurality plurality);

  getConjugationTable(Tense tense);
}

abstract class _DefaultConjugationTable implements Conjugation {
  List _structure = [
    ["I", Person.First, Plurality.Singular],
    ["You", Person.Second, Plurality.Singular],
    ["He", Person.Third, Plurality.Singular],
    ["She", Person.Third, Plurality.Singular],
    ["It", Person.Third, Plurality.Singular],
    ["We", Person.First, Plurality.Plural],
    ["They", Person.Third, Plurality.Plural]
  ];

  getConjugationTable(Tense tense) {
    List items = [];
    _structure.forEach((List e) {
      List item = [];
      Time.values.forEach((Time time) {
        String c = this.get(tense, time, e.elementAt(1), e.elementAt(2));
        item.add("${e.elementAt(0)} ${c}");
      });
      items.add(item);
    });
    return items;
  }
}

class _DefaultConjugation extends Conjugation with _DefaultConjugationTable {
  Map<String, String> _data;

  _DefaultConjugation(this._data);

  get infinitive => _data['1'];
  get participle => _data['4'];
  get progressive => _data['3'];
  get past => _data['2'];
  get thirdPerson => _data['5'];

  String get(Tense tense, Time time, Person person, Plurality plurality) {
    if (tense == Tense.Simple) return _getSimpleTenseConjugation(
        tense, time, person, plurality);
    else if (tense ==
        Tense.Progressive) return "${_SimpleTenseOfBe(time,person,plurality)} ${this.progressive}";
    else if (tense ==
        Tense.Perfect) return "${_SimpleTenseOfHave(time,person,plurality)} ${this.participle}";
    else return "${_SimpleTenseOfHave(time,person,plurality)} been ${this.progressive}";
  }

  _getSimpleTenseConjugation(
      Tense tense, Time time, Person person, Plurality plurality) {
    if (time == Time.Present) {
      return (_isThirdPerson(person) && _isSingular(plurality))
          ? this.thirdPerson
          : this.infinitive;
    } else if (time == Time.Past) return past;
    else if (time == Time.Conditional) return "would ${this.infinitive}";
    else if (time == Time.Future) return "will ${this.infinitive}";
  }
}

class _BeConjugation extends Conjugation with _DefaultConjugationTable {
  Map<String, String> _data;

  _BeConjugation(this._data);

  get infinitive => _data['1'];
  get participle => _data['2'];
  get progressive => _data['3'];

  get(Tense tense, Time time, Person person, Plurality plurality) {
    if (tense == Tense.Simple) return _SimpleTenseOfBe(time, person, plurality);
    else if (tense ==
        Tense.Progressive) return "${_SimpleTenseOfBe(time,person,plurality)} ${this.progressive}";
    else if (tense ==
        Tense.Perfect) return "${_SimpleTenseOfHave(time,person,plurality)} ${this.participle}";
    else return "${_SimpleTenseOfHave(time,person,plurality)} been ${this.progressive}";
  }
}

@Injectable()
class ConjugationService {

  _normalize(String search){
    search = search.trim().toLowerCase();
    if(search.startsWith('to ') && search.length > 3)
      search = search.substring(3,search.length);
    return search;
  }

  Conjugation find(String verb) {
    verb = _normalize(verb);
    Map<String, String> data = this._findByInfinitive(verb.toLowerCase());
    if (data['1'] == 'be') {
      return new _BeConjugation(data);
    }
    return new _DefaultConjugation(data);
  }

  Map<String, String> _findByInfinitive(String verb) {
    return verbs.singleWhere((data) {
      return data['1'] == verb;
    });
  }
}
