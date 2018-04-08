
//Принимаю данные сообщение
chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    opt = {
        type: 'basic',
        title: request.user,
        message: request.msg,
        priority: 2,
        iconUrl: '48.png',
        contextMessage:'Канал: '+request.canal
      
    }
    chrome.notifications.getAll(function(id) {
        // alert(id.id);
     console.log(id);   
    });
    switch (request.count) {
        case 0: chrome.notifications.clear('id' + 1, function () { });
            break;
        case 5: chrome.notifications.clear('id' + 1, function () { });
            break;

    }
    //Вывод сообщения
    chrome.notifications.create('id' + request.count, opt, function (id) { });
});

  //Клик по сообщению
chrome.notifications.onClicked.addListener(function(callback){
    chrome.tabs.create({"window":true, url:"https://www.twitch.tv/popout/rnatpro/chat?popout="});
});

