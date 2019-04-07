$(function() {
  // makes sure links clicked show the right sections
  $("#about-content .content-links").click(e => {
    e.preventDefault();
    let hash = e.target.hash;
    $(hash).tab('show');
  });
});
