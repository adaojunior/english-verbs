import 'package:angular2/angular2.dart';
import 'dart:html' show KeyboardEvent, InputElement;

@Component(
    selector: 'search-input',
    directives: const [NgClass],
    template: '''
      <div class="search-container" [ngClass]="{focused:focused}">
          <img class="search-icon" [src]="(focused) ? 'img/b-search.png' : 'img/search.png'"/>
          <input
            type="text"
            class="search-input"
            placeholder="Search verb"
            (keyup.enter)="submit(\$event)"
            (focus)="focus()"
            (blur)="blur()"
            />
      </div>
    ''',
    styles: const [
      '''
        .search-container{
          width: 400px;
          margin: auto;
          background-color:rgba(255,255,255,0.1);
          border-radius: 2px;
          padding-left: 20px;
          display: flex;
          flex-direction: row;
        }
        .search-input::-webkit-input-placeholder {
          color: #FFF;
        }
        .search-container:hover{
          background-color:rgba(255,255,255,0.3);
        }
        .search-container.focused{
          background-color:rgba(255,255,255,1);
        }
        .search-container.focused .search-input::-webkit-input-placeholder {
          color: #333;
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
          color: #212121;
          outline:none;
        }
      '''
    ]
)
class SearchInput {

  @Output() EventEmitter onChange = new EventEmitter();

  bool focused = false;

  submit(KeyboardEvent event){
    InputElement input = event.target;
    input.blur();
    onChange.add(input.value);
  }

  focus() => focused = true;

  blur() => focused = false;
}
