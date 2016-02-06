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
        .search-container {
          margin: auto;
          background-color:rgba(255,255,255,0.1);
          border-radius: 2px;
          padding-left: 15px;
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
          color: #212121;
        }
        .search-container .search-icon{
          height: 24px;
          width: 24px;
          margin-top: 7px;
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
        .search-input:focus{
          color: #212121;
        }
      '''
    ])
class SearchInput {
  @Output() EventEmitter onChange = new EventEmitter();

  bool focused = false;

  submit(KeyboardEvent event) {
    InputElement input = event.target;
    input.blur();
    onChange.add(input.value);
  }

  focus() => focused = true;

  blur() => focused = false;
}
