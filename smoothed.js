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
  //usage
  //  editor.insert("<a>", "</a>") => Wraps the selected text with these
  //  editor.insert("Foo") => Replaces the selected text with 'Foo'
  Smoothed.prototype.insert = function(startTag, endTag) {
    l(startTag, endTag);
    var asymmetric = arguments.length > 1,
    selectionStart = this.editable.selectionStart,
    selectionEnd = this.editable.selectionEnd,
    oldText = this.editable.value;

    //insert the tag wrapped with the start and end tag
    this.editable.value = oldText.substring(0, selectionStart) + (asymmetric ? startTag + oldText.substring(selectionStart, selectionEnd) + endTag: startTag) + oldText.substring(selectionEnd);
    //select the newly inserted tags and the old selection
    this.editable.setSelectionRange(asymmetric || selectionStart === selectionEnd ? selectionStart + startTag.length: selectionStart, (asymmetric ? selectionEnd: selectionStart) + startTag.length);
    this.editable.focus();
  };

})();

