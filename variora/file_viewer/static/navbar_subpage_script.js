import { getCookie } from 'util.js'

function prepareNavbarFunction() {
  // coterie file viewer pages do not have collect_button
  // only normal file viewer pages have
<<<<<<< HEAD
  $("#collect_button").on("click", function(){
    var span = $(this).find(".fa");
    if (span.hasClass("fa-star-o")) {
      layer.msg('Collected');
      span.removeClass("fa-star-o"); 
      span.addClass("fa-star");
=======
  $('#collect_button').on('click', function(){
    var span = $(this).find('.fa')
    if (span.hasClass('fa-star-o')) {
      layer.msg('Collected')
      span.removeClass('fa-star-o')
      span.addClass('fa-star')
>>>>>>> ed121f7864a25dcc598de8013dc12204957d2cd9
      $.ajax({
        type: 'POST',
        url: '',
        data: {
          csrfmiddlewaretoken: getCookie('csrftoken'),
          operation: 'collect',
          document_id: $("button[name='document_id']").val(),
        },
<<<<<<< HEAD
      });
    }
    else if (span.hasClass("fa-star")) {
      layer.msg('Uncollected');
      span.removeClass("fa-star");
      span.addClass("fa-star-o");
=======
      })
    } else if (span.hasClass('fa-star')) {
      layer.msg('Uncollected')
      span.removeClass('fa-star')
      span.addClass('fa-star-o')
>>>>>>> ed121f7864a25dcc598de8013dc12204957d2cd9
      $.ajax({
        type: 'POST',
        url: '',
        data: {
          csrfmiddlewaretoken: getCookie('csrftoken'),
          operation: 'uncollect',
          document_id: $("button[name='document_id']").val(),
        },
      });
    }
  });

<<<<<<< HEAD
  $("#show_annotation_frame_button").on('click', function() {
      $(".Annotation").each(function() {
          $(this).slideDown(180);
      });
  });
  $("#hide_annotation_frame_button").on('click', function() {
<<<<<<< HEAD
      $(".Annotation").each(function() {
          $(this).slideUp(180);
      });
  });
=======
    $(".Annotation").each(function() {
=======
  $('#show_annotation_frame_button').on('click', function() {
    $('.Annotation').each(function() {
      $(this).slideDown(180)
    })
  })
  $('#hide_annotation_frame_button').on('click', function() {
    $('.Annotation').each(function() {
>>>>>>> ed121f7864a25dcc598de8013dc12204957d2cd9
      $(this).slideUp(180)
    })
  })

  $('#instruction_button').on('click', function() {
    layer.photos({
      photos: {
        'data': [{
          'src': '/media/images/gif/how_to_create_annotation.gif',
          'alt': 'How to create an annotation',
        }]
      },
      shift: 5,
      tab: function(pic, layero){
        $('.layui-layer-imgsee').find('em').remove()
      }
    })

  })
>>>>>>> 0a4a39e176aacb1bca63e3e66725ffdabf50e613
}

export { prepareNavbarFunction }




