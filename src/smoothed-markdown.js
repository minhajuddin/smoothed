;
(function() {
  "use strict";

  Smoothed.prototype.contentChange = _.debounce(function() {
    this.$preview.html(this.markdown());
  },
  10);

  Smoothed.prototype.markdown = function() {
    return marked(this.editable.value);
  };

  Smoothed.prototype.keyUp = function(e) {
    var ctrl = e.ctrlKey,
    shift = e.shiftKey,
    alt = e.altKey,
    key = e.keyCode,
    blocked = false;

    //Ctrl B
    if (ctrl && key == 66) {
      this.insert('**', '**')
    }

    if (blocked) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.$editable.trigger('content-change');
  };

})();

