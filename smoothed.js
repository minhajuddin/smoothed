(function() {
  "use strict";
  var l = function() {
    console.log.apply(console, arguments);
  };

  window.Smoothed = function(options) {
    this.editable = options.editable,
    this.preview = options.preview;

    //internal code
    l('init');
    l(options);
    l('done');

    return this;
  };

  //commands
  //inserts text at current cursor position or at a 
  //specific cursor position if position is passed
  var insert = function(text, position){
    var pos = this.cursorPosition();
        
  }

  Smoothed.prototype.insert = function(html) {
    l("inserting", html);
    this.editable.value += html;
  };

  Smoothed.prototype.selectedText = function() {
    var value = this.editable.value,
        selectedText = value.substring(this.editable.selectionStart, this.editable.selectionEnd);
    return selectedText;
  };
})();

