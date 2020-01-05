let select = document.querySelector('.sel'),
  col2 = document.querySelectorAll('.price__column--2'),
  col3 = document.querySelectorAll('.price__column--3'),
  col4 = document.querySelectorAll('.price__column--4'),
  price = document.querySelector('.price');

select.onchange = function() {
  let indexSelected = select.selectedIndex,
    option = select.querySelectorAll('option')[indexSelected],
    selectedId = option.getAttribute('id');

  if( selectedId === '2' ) {
    for(let i = 0; i < col2.length; i++) {
      col2[i].classList.remove("hide");
    }
  } else {
    for(let i = 0; i < col2.length; i++) {
      col2[i].classList.add("hide");
    }
  }
  if( selectedId === '3' ) {
    for(let i = 0; i < col2.length; i++) {
      col2[i].classList.add("hide");
      col3[i].classList.remove("hide");
    }
  } else {
    for(let i = 0; i < col2.length; i++) {
      col3[i].classList.add("hide");
    }
  }
  if( selectedId === '4' ) {
    for(let i = 0; i < col2.length; i++) {
      col2[i].classList.add("hide");
      col4[i].classList.remove("hide");
    }
  } else {
    for(let i = 0; i < col2.length; i++) {
      col4[i].classList.add("hide");
    }
  }
};
