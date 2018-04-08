
$(function () {
  var message;
  var i = 0;
  var div_chat;
  var voice;
  var user_canal;
  //Таймер проверки тегов
  
  setInterval(() => {
    div_chat = $('.chat-line__message').last();
    if (message != $(div_chat).find('[data-a-target=chat-message-text]').eq(0).text())
      //Принимаем настроки storage из расширения вк/вык
      chrome.storage.sync.get(['on_check'], function (result) {
        if (result.on_check == true) {
          show();

        } else {

          synth.cancel();

        }
      });
  }, 1000);

  function show() {
    user_canal = $('.cn-bar__displayname').last().text();
    nick = $('.chat-author__display-name').last().text();
    message = $(div_chat).find('[data-a-target=chat-message-text]').eq(0).text();

    if (message.trim() === '') {
      //console.log(message);
    } else {
      // console.log(message);
      // Выводи уведомление
      if (i == 5) {
        i = 0;
      } else {
        i++;
      }
      //отправляем данные в скрипт Message.js 
      chrome.runtime.sendMessage({ msg: message, user: nick, count: i, canal: user_canal }, function (response) {
      });

      //Принимаем настроки из расширения вк/вык звук
      chrome.storage.sync.get(['voice_check'], function (result) {

        if (result.voice_check == true) {

          //читаем текст ник английский
          talk(3, nick.trim());
          //читаем текст сообщение русский
          talk(17, message.trim());

          function talk(voice, text) {

            var synth = window.speechSynthesis;
            var utterance = new SpeechSynthesisUtterance(text);

            // Громкость речи
            chrome.storage.sync.get(['value'], function (result) {
              utterance.volume = result.value;   
               // Выбор голоса
            utterance.voice = synth.getVoices()[voice];
            // проговариваем 
            synth.speak(utterance);
            });
        
          }
        }
      });
    }
  }
  // $('textarea').on('change',function(){
  //alert('Нажали');
  // });
});


  // Лист голосов
  // speechSynthesis.onvoiceschanged = function () {
  //   var voices = this.getVoices();
  //   console.log(voices);
  // };

  
  // setInterval(() => {
  //   chat_bot();
  // }, 10000);

  // function chat_bot() {

  //   //    $('textarea.tw-textarea').val('\nПривет всем!');
  //   //    $('textarea.tw-textarea').text('\nПривет всем!');

  //   //   // $('textarea.tw-textarea').select();
  //   //    $('textarea.tw-textarea').focus();

  //   //   // input
  //   //   $('textarea.tw-textarea').trigger($.Event('keypress', { keyCode: 32 }));
  //   //   $('[data-a-target=chat-send-button]').click();
  //   // 
  // }