$(function() {
  switchContent = e => {
    e.preventDefault();
    let key = e.target.hash;
    
    let showElem = $(`> div${key}`, ".content");
    let hideElems = $(`> div:not(${key})`, ".content");

    showElem.show();
    showElem.children().show();

    hideElems.hide();
    hideElems.children().hide();
  };

  $(".content > div:not('#about-content')").hide();

  // makes sure links clicked show the right sections
  $(".links a").click(switchContent);
  $("#about-content a.content-links").click(switchContent);
});
