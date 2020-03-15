(function () {

  let phone = document.querySelector('#phone');
  phone.value = '+1 (';
  phone.addEventListener('input', function (e) {
console.log(e);
    let result = '+1 (';
    let arrStr = Array.from(this.value);
    for (let i = 4; i < arrStr.length; i++) {
      if (i === 18) break;

      if (arrStr[i]) {
        let item = arrStr[i].match(/\d+/);
        if (item) {
          switch (result.length) {
            case 6: result += item + ') ';
              break;
            case 8: result += ' ' + item;
              break;
            case 12:
            case 15: result += '-' + item;
              break;
            default : result += item;
          }
        }
      }
    }
    this.value = result.trim();
  })

})();
