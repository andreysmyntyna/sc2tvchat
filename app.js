//    SC2TV.RU chat extension utility
//    Copyright (C) 2012  Andrey Smyntyna <andreysmyntyna@gmail.com>
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>

var LastMessageTime = undefined;
var ChatWindow = null;
var ChatStore = null;
var ChatView = null;
var MessageOrder = 0;

Ext.define('SC2TVCHAT.model.Info',
    {
        extend    :'Ext.data.Model',
        idProperty:"UID",
        fields    :
            [
                {name:"UID", type:'string'},
                {name:"PublishTime", type:'date', dateFormat:'d-m-Y H:i:s'},
                {name:"Order", type: 'int'},
                {name:"Publisher", type:'string'},
                {name:"URL", type:'string'},
                {name:"HostName", type:'string'},
                {name:"Type", type:'int'},
                {name:"Title", type:'string'},
                //Kinopoisk
                {name:"posterAlt", type:'string'},
                {name:"posterSrc", type:'string'},
                {name:"posterDescription", type:'string'}
            ]
    });

Ext.define('SC2TVCHAT.store.Info',
    {
        extend  : 'Ext.data.Store',
        model   : 'SC2TVCHAT.model.Info',
        autoLoad: true,
        data    : {infos:[]},
        sorters :
            [
                {
                    property: 'Order',
                    direction: 'DESC'
                }
            ],
        proxy:
        {
            type  : 'memory',
            reader:
            {
                type: 'json',
                root: 'infos'
            }
        }
    });


var info_tpl = new Ext.XTemplate(
    '<tpl for=".">',
      '<span style="font-family:Arial;font-size:9px;"><a style="color:green;" target="_blank" href="http://sc2tv.ru/users/{Publisher}">{Publisher}</a></span>',
      '<span style="margin-left:7px;font-family:Arial;font-size:9px;"><a style="color:blue;" target="_blank" href="{URL}">{HostName}</a></span>',
      '<br>',
      '<tpl if="this.image_message(Type)">',
        '<img style="width:100%;" src="{URL}">',
      '</tpl>',
      '<tpl if="this.kinopoisk_message(Type)">',
        '<img style="width:100%;" src="{posterSrc:htmlEncode}" title="{posterAlt:htmlEncode}\n{posterDescription:htmlEncode}" alt="{posterAlt:htmlEncode}\n{posterDescription:htmlEncode}">',
      '</tpl>',
      '<tpl if="this.youtube_message(Type)">',
        '<div class="em_video">',
          '<img class="em_video" src="chrome-extension://facneciafohbgoldcbpnnoiiolejjlee/images/video_bg.png">',
          '<object class="em_video">',
            '<param name="movie"',
            'value="https://www.youtube.com/v/{[this.youtube_video_id(values.URL)]}?version=3&autoplay=0"></param>',
            '<param name="allowScriptAccess" value="always"></param>',
            '<embed class="em_video" src="https://www.youtube.com/v/{[this.youtube_video_id(values.URL)]}?version=3&autoplay=0"',
            'type="application/x-shockwave-flash" allowscriptaccess="always">',
            '</embed>',
          '</object>',
        '</div>',
      '</tpl>',
      '<tpl if="this.website_message(Type)">',
        '<span style="font-family:Arial;font-size:9px;width:100%;"><a target="_blank" href="{URL}">{URL}</a></span>',
      '</tpl>',
      '<br style="font-family:Arial;font-size:9px;">',
    '</tpl>',
    {
        youtube_video_id: function(value){ return value.YoutubeVideoCode();},
        youtube_message: function(Type) {return Type == URL_TYPE_YOUTUBE_VIDEO;},
        image_message: function(Type) {return Type == URL_TYPE_IMAGE;},
        website_message: function(Type) {return Type == URL_TYPE_WEBSITE;},
        kinopoisk_message: function(Type) {return Type == URL_TYPE_KINOPOISK_RU;}
    }
);

Ext.define("SC2TVCHAT.view.Info",
    {
        extend: "Ext.grid.Panel",
        alias: "widget.infoview",
        border: false,
        hideHeaders: true,
        viewConfig:
        {
            markDirty: false
        },
        initComponent: function()
        {
            var comp = this;

            comp.store = Ext.create("SC2TVCHAT.store.Info", {});
            comp.columns =
                [
                    {
                        width: "100%",
                        text: "Описание файла",
                        renderer: function (value,metadata, record)
                        {
                            return info_tpl.apply(record.data);
                        }
                    }
                ];
            comp.callParent();
        }
    });

    Ext.define("SC2TVCHAT.view.MainWindow",
    {
        extend: "Ext.window.Window",
        width: 190,
        height: 500,
        layout: "fit",
        autoShow: true,
        title: "SC2TV CHAT+",
        closable: false,
        iconCls: 'chat-window-icon',
        items:
            [
                {
                    xtype: "infoview",
                    itemId: "chatview"
                }
            ],
        initComponent:function ()
        {
            var comp = this;

            var qtabs = $("#block-quicktabs-1");
            var chat_lt = qtabs.offset();
            var chat_width = qtabs.width();

            comp.x = chat_lt.left + chat_width;
            comp.y = chat_lt.top;

            comp.addListener('afterrender', function (sender, eOpts)
            {
                ChatView = comp.queryById("chatview");
                ChatStore = ChatView.getStore();
                return true;
            });

            comp.tools =
            [
                {
                    type: 'plus',
                    hidden: true,
                    handler: function()
                    {
                        process_link("http://www.kinopoisk.ru/film/278522/",{name: "sintix"});
                        process_link("http://www.kinopoisk.ru/film/462682/",{name: "sintix"});
                    }
                }
            ];
            comp.callParent();
        }
    });

function process_link(URL, chat_message)
{
    var new_info = Ext.create('SC2TVCHAT.model.Info',
        {
            UID               : GUID(),
            PublishTime       : DateFormat(new Date(), 'd-m-Y H:i:s'),
            Publisher         : chat_message.name,
            Order             : MessageOrder++,
            URL               : URL,
            HostName          : URL.HostName(),
            Type              : URL.ResourceType(),
            Title             : "",
            posterAlt         : "",
            posterSrc         : "",
            posterDescription : ""
        });

    if(new_info.data.Type == URL_TYPE_KINOPOISK_RU) {
        $.when(URL.getKinopoiskUrlData()).then(function(success, posterAlt, posterSrc, posterDescription) {
            log("getKinopoiskUrlData : ");
            log(arguments);
            if(success) {
                new_info.set('posterAlt', posterAlt);
                new_info.set('posterSrc', posterSrc);
                new_info.set('posterDescription', posterDescription);
            } else {
                new_info.set("Type", URL_TYPE_WEBSITE);
            }
            ChatStore.add(new_info);
        });
    } else {
        ChatStore.add(new_info);
    }

    log("process_link : " + "==========================================================================");
}

function setupChatAjax()
{
    $.ajaxSetup(
        {
            dataFilter: function (data, type)
            {
                var myEvent= document.createEvent('CustomEvent');
                myEvent.initCustomEvent('ChatDataUpdated', true, true, JSON.parse(data));
                document.body.dispatchEvent(myEvent);
                return data;
            }
        });
}

log(url("hostname"));

switch(url("hostname"))
{
    case "chat.sc2tv.ru":

        var injectedScript = document.createElement('script');
        injectedScript.type = 'text/javascript';
        injectedScript.text = '('+setupChatAjax+')();';
        (document.body || document.head).appendChild(injectedScript);

        document.body.addEventListener('ChatDataUpdated', function(event)
        {
            var messages = event.detail.messages;
            var new_messages = [];
            if(LastMessageTime==undefined)
            {
                LastMessageTime = new Date(Date.parse(messages[messages.length-1].date));
                LastMessageTime.setDate(LastMessageTime.getDate()-1);
            }

            for(var i=0; i<messages.length;i++)
            {
                var MessageTime = new Date(Date.parse(messages[i].date));

                if (MessageTime>LastMessageTime)
                {
                    var urls = messages[i].message.Links();
                    urls.forEach(function(element, index, array)
                    {
                        chrome.extension.sendMessage({action: "new_url", data: {URL: element, message: messages[i]}});
                    });
                }
            }

            LastMessageTime = new Date(Date.parse(messages[0].date));
        });
        break;
    case "sc2tv.ru":

        Ext.onReady(function()
        {
            ChatWindow = Ext.create("SC2TVCHAT.view.MainWindow",{});

            chrome.extension.onRequest.addListener(function (request, sender, callback)
            {
                if (request.action.is("new_url"))
                {
                    log("sc2tvchat:  " + request.data.message.name + " >>> " + request.data.URL);
                    process_link(request.data.URL, request.data.message);
                }
            });



        });

}