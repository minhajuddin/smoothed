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
        this.insertStringAt("\n\n----------\n\n", pos + 1)
      }
    }),
    ol: new Smoothed.Command({
      key: {
        code: 79 //Ctrl o
      },
      exec: function() {
        var pos = this.positionOfLineEnd();
        this.insertStringAt("\n\n 1. List item\n\n", pos + 1);
        this.editable.setSelectionRange(pos + 6, pos + 15); //to select the text "List item"
      }
    }),
    ul: new Smoothed.Command({
      key: {
        code: 84 //Ctrl o
      },
      exec: function() {
        var pos = this.positionOfLineEnd();
        this.insertStringAt("\n\n - List item\n\n", pos + 1);
        this.editable.setSelectionRange(pos + 5, pos + 14); //to select the text "List item"
      }
    })

  };

  Smoothed.prototype.commands = function() {
    return commands;
  }

  //for debugging
  Smoothed.prototype.keyUp = function(e) {
    //console.log(e.keyCode);
  };

})();

