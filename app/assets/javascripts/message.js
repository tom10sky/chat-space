$(function(){
  
  function buildMessage(message){
      var addImage = (message.image !== null) ? `<img class = "image_size", src="${message.image}">` : ''
      var html = 
        `<div class="message">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <div class="lower-message__content">
                ${message.content}
            </div>
            <div class="lower-message__image">
                ${addImage}
            </div>
          </div>
        </div>`
      return html;
  }
$("form").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(message){
       var html = buildMessage(message);
       $('.messages').append(html);
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
       $('form')[0].reset();
     })
     .fail(function(){
       alert('エラー');
      });
      return false;
  });
});

