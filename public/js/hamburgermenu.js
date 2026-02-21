$(function () {
  const $menu = $(".sidebar--mobile");

  $("#hamburger").on("click", function (e) {
    e.preventDefault();
    $menu.addClass("is-open");
    $("html, body").css("overflow", "hidden");
  });

  $("#close").on("click", function (e) {
    e.preventDefault();
    $menu.removeClass("is-open");
    $("html, body").css("overflow", "");
  });
});
