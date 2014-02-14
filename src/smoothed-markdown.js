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
      code: 66 //Ctrl b
    },
    exec: function() {
      this.insert("**", "**")
    }
  }), new Smoothed.Command({
    key: {
      code: 73 //Ctrl i
    },
    exec: function() {
      console.log("HOO")
      this.insert("*", "*")
    }
  })]

  Smoothed.prototype.commands = function() {
    return commands;
  }

  //for debugging
  Smoothed.prototype.keyUp = function(e) {
    //console.log(e.keyCode);
  };

})();

