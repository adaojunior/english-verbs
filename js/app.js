
Vue.component('tabs', {
  props:['tense'],
  template: '#tabs',
  methods:{
    click: function(tense){
      this.tense = tense;
      this.$dispatch('tense-changed', tense);
    }
  }
});

Vue.component('search-input', {
  template: '#search-input',
  data: function(){
    return {
      search: ""
    };
  },
  methods:{
    submit:function(){
      this.$dispatch('search-submited', this.search);
    }
  }
});

Vue.component('app-loading', {
  template: "<div class=\"message\">Loading...</div>"
});

Vue.component('app-not-found', {
  props:['lastSearch'],
  template: "<div class=\"message\">Your search -{{lastSearch}}- did not match any verbs.</div>"
});

Vue.component('app-content', {
  props: ['conjugation','tense'],
  data: function(){
    return {
      structure: [
        ["I", "first","singular"],
        ["You","second","singular"],
        ["He","third","singular"],
        ["She","third","singular"],
        ["It","third","singular"],
        ["We","first","plural"],
        ["They","third","plural"]
      ]
    };
  },
  template: '#app-content'
});

new Vue({
  el: '#app',
  data:{
    conjugation: null,
    lastSearch: null,
    tense: 'simple',
    content: 'app-loading'
  },
  ready: function(){
    Api.inicialize().then(() => {
      this.search("be");
    });
  },
  methods: {
    search: function(word){
      this.lastSearch = word;
      try{
        this.conjugation = new $api.Conjugation(word);
        this.tense = 'simple';
        this.content = "app-content";
      }
      catch(error){
        this.content = "app-not-found";
      }
    }
  },
  events:{
    'search-submited':function(word){
      this.search(word);
    },
    'tense-changed':function(tense){
      this.tense = tense;
    }
  }
});
