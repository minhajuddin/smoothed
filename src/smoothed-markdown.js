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

  var commands = {

    bolden: new Smoothed.Command({
      buttonSelector: 'a[data-smoothed-command=bolden]',
      key: {
        code: 66 //Ctrl b
      },
      exec: function() {
        this.insert("**", "**")
      }
    }),
    italicize: new Smoothed.Command({
      key: {
        code: 73 //Ctrl i
      },
      exec: function() {
        this.insert("*", "*")
      }
    }),
    h1: new Smoothed.Command({
      key: {
        code: 49 //Ctrl 1
      },
      exec: function() {
        var pos = this.positionOfLineStart();
        this.insertStringAt("#", pos + 1)
      }
    }),
    h2: new Smoothed.Command({
      key: {
        code: 50 //Ctrl 2
      },
      exec: function() {
        var pos = this.positionOfLineStart();
        this.insertStringAt("##", pos + 1)
      }
    }),
    h3: new Smoothed.Command({
      key: {
        code: 51 //Ctrl 3
      },
      exec: function() {
        var pos = this.positionOfLineStart();
        this.insertStringAt("###", pos + 1)
      }
    }),
    hr: new Smoothed.Command({
      key: {
        code: 82 //Ctrl r
      },
      exec: function() {
        var pos = this.positionOfLineEnd();
        this.insertStringAt("----------", pos + 1)
      }
    })
  };

  Smoothed.prototype.commands = function() {
    return commands;
  }

  //for debugging
  Smoothed.prototype.keyUp = function(e) {
    console.log(e.keyCode);
  };

})();
