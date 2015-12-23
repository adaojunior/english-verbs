function Api($verbs)
{
    function ValidatePerson(person)
    {
        if(["first","second","third"].indexOf(person) < 0)
            throw   "Invalid Person.";
        else
            return  true;
    }

    function ValidatePlurality(plurality)
    {
        if(["singular","plural"].indexOf(plurality) < 0)
            throw   "Invalid plurality.";
        else
            return  true;
    }

    function ValidateTense(tense)
    {
        if(["simple","progressive","perfect","perfect-progressive"].indexOf(tense) < 0)
            throw   "Invalid tense.";
        else
            return  true;
    }

    function ValidateTime(time)
    {
        if(["present","past","future","conditional"].indexOf(time) < 0)
            throw   "Invalid time.";
        else
            return  true;
    }

    function BeAsAux(time, person, plurality)
    {
        var isFirst = (person == "first"),
            isSecond = (person == "second"),
            isThird = (person == "third"),
            isSingular = (plurality == "singular"),
            isPlural = (plurality == "plural");

        if(time == "present"){
            if(isFirst && isSingular)
                return "am";
            else if(isFirst || isSecond || isThird && isPlural)
                return "are";
            else
                return "is";
        }
        else if(time == "past"){
            if(isFirst && isSingular || isThird && isSingular)
                return "was";
            else
                return "were";
        }
        else if(time == "future")
            return "will be";
        else if(time == "conditional")
            return "would be";
    }

    function HaveAsAux(time, person, plurality)
    {
        if(time == "present"){
            if(person == "third" && plurality == "singular")
                return "has";
            else
                return "have";
        }
        else if(time == "past")
            return "had";
        else if(time == "future")
            return "will have";
        else if(time == "conditional")
            return "would have";
    }

    function SearchAbsolutely(word)
    {
        var result = null;
        word = word.toLowerCase();
        for(i in $verbs)
        {
            if($verbs[i].word == word)
            {
                result = $verbs[i];
                break;
            }
        }
        return result;
    }

    function FindByWord(value)
    {

    }

    function FindInfinitive(word)
    {
        var Cursor = SearchAbsolutely(word);
        if(Cursor != null && Cursor.type != "infinitive"){
            Cursor = FindById(Cursor.infinitive);
        }
        return Cursor;
    }

    function FindById(_id)
    {
        return $verbs[_id];
    }

    function Conjugation(q)
    {
        var Cursor = FindInfinitive(q);

        if(Cursor == null){
            throw "NotFound";
        }


        var Infinitive  = Cursor.word,
            Progressive = FindById(Cursor.conjugation.progressive).word,
            Participle  = FindById(Cursor.conjugation.participle).word;

        var IsBe = (Infinitive.toLowerCase() == "be");

        if(!IsBe){
            var Past        = FindById(Cursor.conjugation.past).word,
                ThirdPerson = FindById(Cursor.conjugation['3th-person']).word;
        }

        this.GetInfinitive = function()
        {
            return Infinitive;
        }

        this.HasTense = function(tense)
        {
            ValidateTense(tense);
            if(!Cursor.hidetenses)
                return true;
            return (Cursor.hidetenses.indexOf(tense) >= 0) ? false : true;
        }

        this.Conjugue = function(tense, time, person, plurality)
        {
            plurality = plurality.toLowerCase();
            person = person.toLowerCase();
            time = time.toLowerCase();
            tense = tense.toLowerCase();

            ValidatePerson(person);
            ValidatePlurality(plurality);
            ValidateTime(time);
            ValidateTense(tense);

            if(tense == "simple"){
                if(time == "present"){
                    if(!IsBe){
                        if(person == "third" && plurality == "singular")
                            return ThirdPerson;
                        else
                            return Infinitive;
                    }
                    else{
                        if(person == "first" && plurality == "singular")
                            return "am";
                        else if(person == "third"  && plurality == "singular")
                            return "is";
                        else
                            return "are";
                    }
                }
                else if(time == "past"){
                    if(!IsBe)
                        return Past;
                    else{
                        if(plurality == "singular" && (person == "first" || person == "third"))
                            return "was";
                        else
                            return "were";
                    }
                }
                else if(time == "future")
                    return "will " + Infinitive;
                else if(time == "conditional")
                    return "would " + Infinitive;
            }
            else if(tense == "progressive")
                return BeAsAux(time, person,plurality) + " " + Progressive;
            else if(tense == "perfect")
                return HaveAsAux(time, person,plurality) + " " + Participle;
            else if(tense == "perfect-progressive")
                return HaveAsAux(time, person,plurality) + " been " + Progressive;
        }
    }


    this.FindInfinitive = FindInfinitive;
    this.FindById = FindById;
    this.Conjugation = Conjugation;
    this.HaveAsAux = HaveAsAux;
    this.BeAsAux = BeAsAux;
    this.ValidateTime = ValidateTime;
    this.ValidateTense = ValidateTense;
    this.ValidateTense = ValidateTense;
    this.ValidatePerson = ValidatePerson;
}

Api.inicialize = function(){
  return fetch('verbs.json')
  .then((response) => response.json())
  .then((verbs) => {
    window.$api = new Api(verbs);
  });
};
