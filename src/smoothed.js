;
(function() {
  "use strict";
  var noop = function() {},
  defaultOptions = {};

  window.Smoothed = function(options) {
    this.options = _.defaults(options, defaultOptions);
    this.editable = this.options.editable;
    this.preview = this.options.preview;
    this.$editable = $(this.options.editable);
    this.$preview = $(this.options.preview);
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

  Smoothed.prototype.positionOfLineStart = function() {
    var i = this.editable.selectionStart;
    for (; i >= 0; i--) {
      if (this.editable.value.substr(i, 1) == "\n") {
        break;
      }
    }
    return i;
  }

  Smoothed.prototype.insertStringAt = function(str, pos) {
    this.editable.setSelectionRange(pos, pos);
    this.insert(str);
    this.$editable.trigger('content-change');
  }

  Smoothed.prototype.commands = function() {
    return [];
  }

  Smoothed.prototype.contentChange = noop
  Smoothed.prototype.keyUp = noop
  Smoothed.prototype.runKeyCommand = function(e) {
    var cmd = _.find(this.commands(), function(cmd) {
      return cmd.keyCodeMatches(e);
    });

    if (!cmd) {
      return;
    }

    cmd.exec.apply(this);

    e.stopPropagation();
    e.preventDefault();
  }

  Smoothed.Command = function(options) {
    this.options = options;
    if (options.key) {
      this.key = options.key;
    }
    this.exec = options.exec;
    return this;
  };

  Smoothed.Command.prototype.keyCodeMatches = function(e) {
    if (!this.key) {
      return false;
    }
    return e.ctrlKey && this.key.code == e.keyCode;
  };

  Smoothed.prototype.wireupEventHandlers = function() {
    var contentChange = _.bind(this.contentChange, this)
    this.$editable.on('keyup', _.bind(this.keyUp, this));
    this.$editable.on('keyup', _.bind(this.runKeyCommand, this));
    this.$editable.on('keyup', contentChange);
    this.$editable.on('content-change', contentChange);
  };

})();

