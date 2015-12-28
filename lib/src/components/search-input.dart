import 'package:angular2/angular2.dart';

@Component(
    selector: 'search-input',
    template: '''
      <div class="search-container">
          <img class="search-icon" src="img/search.png"/>
          <input type="text" class="search-input" placeholder="Search verb" (keyup.enter)="update(\$event.target.value)"/>
      </div>
    ''',
    styles: const [
      '''
        .search-container{
          width: 400px;
          margin: auto;
          background-color:rgba(255,255,255,0.3);
          border-radius: 2px;
          padding-left: 15px;
          display: flex;
          flex-direction: row;
        }

        .search-container .search-icon{
          height: 24px;
          width: 24px;
          margin-top: 6px;
          margin-right: 10px;
        }

        .search-input{
          height: 36px;
          width: 100%;
          background-color: transparent;
          border:none;
          color: #FFF;
          outline:none;
        }


        .search-input::-webkit-input-placeholder {
          color: #FFF;
        }

      '''
    ]
)
class SearchInput {

  @Output() EventEmitter onChange = new EventEmitter();

  update(String value){
    onChange.add(value);
  }
}
