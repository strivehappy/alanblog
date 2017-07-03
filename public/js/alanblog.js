/**
 * Created by alan on 2016/4/15.
 */

$(document).ready(function(){

  /*****************************************************************************************************
   * define global variables
   *****************************************************************************************************/
  var newBkgImgUrl;

  /*****************************************************************************************************
   * define functions
   *****************************************************************************************************/

  function changeBkgImg() {
    var bkgImgRegionPath = 'http://op7vsf27w.bkt.clouddn.com/doertw_bkgimage/';
    function getNewBkgImgUrl() {
      tmpImgNum = Math.floor(Math.random() * 54);
      return (bkgImgRegionPath + 'IMG_' + tmpImgNum + '.jpg');
    }
    if (undefined === newBkgImgUrl) {
      newBkgImgUrl = getNewBkgImgUrl();
      // newBkgImgUrl = "http://op7vsf27w.bkt.clouddn.com/doertw_bkgimage/IMG_4.jpg";
    }
    $('body').css('background-image', 'url('+ newBkgImgUrl +')');
    $('#bkgImgStore').html('<span style="background-image: url('
      + (newBkgImgUrl = getNewBkgImgUrl())
      + ');width: 0px;height: 0px;display: inline;"></span>');
  }

  function MarkdownUpdate(input, preview) {
    preview.innerHTML = markdown.toHTML(input.value);
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  function BindMarkdown() {
    $('#blog-text-input').bind('input propertychange', function() {
      var id_input = document.getElementById('blog-text-input');
      var id_preview = document.getElementById('blog-text-preview');
      MarkdownUpdate(id_input, id_preview);
    });
  }

  function goToHomePage() {
    $('#article').attr('class', 'hideItem');
    $('#navigation').attr('class', 'homePage');
    $('#title').attr('class', 'showItem');
    changeBkgImg();
    window.history.pushState({routeIndex: 0}, "", "/index.html"); // TODO: need to be adapted with IE8 or lower ones
  }

  function goToBlogPage() {
    $('#article').load("/blog.html #main", function () {
      $('#article').attr('class', 'showItem');
      BindMarkdown();
    });
    $('#navigation').attr('class', 'otherPage');
    $('#title').attr('class', 'hideItem');
    window.history.pushState({routeIndex: 1}, "", "/blog.html");
  }

  function goToAboutPage() {
    $('#article').load("/about.html #main", function () {
      $('#article').attr('class', 'showItem');
    });
    $('#navigation').attr('class', 'otherPage');
    $('#title').attr('class', 'hideItem');
    window.history.pushState({routeIndex: 3}, "", "/about.html");
  }


  /*****************************************************************************************************
   * apply functions
   *****************************************************************************************************/

  $('#title').click(function () {
    changeBkgImg();
    return false;
  });

  $('#blog').click(function () {
    goToBlogPage();
    return false;
  });

  $('#home').click(function () {
    goToHomePage();
    return false;
  });

  $('#about').click(function () {
    goToAboutPage();
    return false;
  });

  window.onpopstate = function() {
    if (history.state.routeIndex === 0) {
      goToHomePage();
    } else if (history.state.routeIndex === 1) {
      goToBlogPage();
    }
  };

  changeBkgImg();
  BindMarkdown();
  hljs.initHighlightingOnLoad();

}); // end of document ready

