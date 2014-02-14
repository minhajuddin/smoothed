;
(function() {
  "use strict";
  var noop = function() {},
  defaultOptions = {};

  window.Smoothed = function(options) {
    this.options = _.
  default(options, defaultOptions);
    this.editable = options.editable;
    this.preview = options.preview;
    this.$editable = $(options.editable);
    this.$preview = $(options.preview);
    //internal code
    this.wireupEventHandlers();
    this.$editable.trigger('content-change');
    return this;
  };

  //commands
  //usage
  //  editor.insert("<a>", "</a>") => Wraps the selected text with these
  //  editor.insert("Foo") => Replaces the selected text with 'Foo'
  Smoothed.prototype.insert = function(startTag, endTag) {
    var asymmetric = arguments.length > 1,
    selectionStart = this.editable.selectionStart,
    selectionEnd = this.editable.selectionEnd,
    oldText = this.editable.value;

    //insert the tag wrapped with the start and end tag
    this.editable.value = oldText.substring(0, selectionStart) + (asymmetric ? startTag + oldText.substring(selectionStart, selectionEnd) + endTag: startTag) + oldText.substring(selectionEnd);
    //select the newly inserted tags and the old selection
    this.editable.setSelectionRange(asymmetric || selectionStart === selectionEnd ? selectionStart + startTag.length: selectionStart, (asymmetric ? selectionEnd: selectionStart) + startTag.length);
    this.editable.focus();
    this.$editable.trigger('content-change');
  };

  Smoothed.prototype.contentChange = noop
  Smoothed.prototype.keyUp = noop

  Smoothed.prototype.wireupEventHandlers = function() {
    var self = this;
    this.$editable.on('keyup', _.bind(this.keyUp, this));
    this.$editable.on('content-change', _.bind(this.contentChange, this));
  };

})();

