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

  var commands = [new Smoothed.Command({
    key: {
      code: 66
    },
    exec: function() {
      console.log("Test")
    }
  })]

  Smoothed.prototype.commands = function() {
    return commands;
  }

})();

