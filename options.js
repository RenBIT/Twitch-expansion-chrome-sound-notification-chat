$(function () {
  var chek;
  var voice;
  var value;

  chrome.storage.sync.get(['on_check'], function (result) {
    chek = result.on_check;
    $('.on_check').prop('checked', $.parseJSON(chek));
  });

  chrome.storage.sync.get(['voice_check'], function (result) {
    voice = result.voice_check;
    $('.voice_check').prop('checked', $.parseJSON(voice));
  });


  $('.on_check').on('change', function () {
    chek = $(this).prop("checked");
    chrome.storage.sync.set({ 'on_check': chek }, function () {
      console.log('Settings saved chek');
    });

  });

  $('.voice_check').on('change', function () {
    voice = $(this).prop("checked");
    chrome.storage.sync.set({ 'voice_check': voice }, function () {
      console.log('Settings saved voice');
    });
  });

  $('.value').on('change', function () {
    value = $(this).val();
    $('.vl').text(value);
    chrome.storage.sync.set({ 'value': value }, function () {
      console.log('Settings saved value');
    });
  });


});