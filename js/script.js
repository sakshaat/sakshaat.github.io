$(function(){

    // makes sure links clicked show the right sections
    $(".links *").click(function(e) {
        e.preventDefault();
        let key = e.target.hash.substring(1); 
        let elems = $('.content *');

        Object.keys(elems).forEach(i => {
            elems[i].hidden = elems[i].id === key ? false : true;
        })
    })
  
  });