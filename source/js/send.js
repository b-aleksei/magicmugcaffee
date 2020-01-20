$(document).ready(function() {
let form = $("#form");
  form.submit(function() {
    $.ajax({
      type: "POST",
      url: "form.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      alert("Your application is accepted! Thanks.");
      form.trigger("reset");
    });
    return false;
  });

});
