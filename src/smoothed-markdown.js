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
    //Ctrl b
    bolden: new Smoothed.Command({
      key: 66,
      exec: function() {
        this.insert("**", "**")
      }
    }),
    //Ctrl i
    italicize: new Smoothed.Command({
      key: 73,
      exec: function() {
        this.insert("*", "*")
      }
    }),
    //Ctrl 1
    h1: new Smoothed.Command({
      key: 49,
      exec: function() {
        var pos = this.positionOfLineStart();
        this.insertStringAt("#", pos + 1)
      }
    }),
    //Ctrl 2
    h2: new Smoothed.Command({
      key: 50,
      exec: function() {
        var pos = this.positionOfLineStart();
        this.insertStringAt("##", pos + 1)
      }
    }),
    //Ctrl 3
    h3: new Smoothed.Command({
      key: 51,
      exec: function() {
        var pos = this.positionOfLineStart();
        this.insertStringAt("###", pos + 1)
      }
    }),
    //Ctrl r
    hr: new Smoothed.Command({
      key: 82,
      exec: function() {
        var pos = this.positionOfLineEnd();
        this.insertStringAt("\n\n----------\n\n", pos + 1)
      }
    }),
    //Ctrl o
    ol: new Smoothed.Command({
      key: 79,
      exec: function() {
        var pos = this.positionOfLineEnd();
        this.insertStringAt("\n\n 1. List item\n\n", pos + 1);
        this.editable.setSelectionRange(pos + 6, pos + 15); //to select the text "List item"
      }
    }),
    //Ctrl u
    ul: new Smoothed.Command({
      key: 84,
      exec: function() {
        var pos = this.positionOfLineEnd();
        this.insertStringAt("\n\n - List item\n\n", pos + 1);
        this.editable.setSelectionRange(pos + 5, pos + 14); //to select the text "List item"
      }
    }),
    //Ctrl q
    quote: new Smoothed.Command({
      key: 81,
      exec: function() {
        var pos = this.editable.selectionStart;
        this.insertStringAt("\n\n> put your quote here\n\n", pos);
        this.editable.setSelectionRange(pos + 4, pos + 23); //to select the text "put your quote here"
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

