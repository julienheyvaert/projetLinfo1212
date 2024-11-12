const checkInputUser = {
  IsvalidInput: function (input) {
    if (input.length < 0) {
      return false;
    }
  },
  Isvalidemail: function (input) {
    for (const e in input) {
      if (e == "@") {
        return true;
      }
    }
    return false;
  },
};

module.exports = checkInputUser;
