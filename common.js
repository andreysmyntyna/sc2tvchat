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

/**
 * http://stackoverflow.com/questions/4504853/how-do-i-extract-a-url-from-plain-text-using-jquery
 * A utility function to find all URLs - FTP, HTTP(S) and Email - in a text string
 * and return them in an array.  Note, the URLs returned are exactly as found in the text.
 *
 * @param text
 *            the text to be searched.
 * @return an array of URLs.
 */
function findUrls( text )
{
    var source = (text || '').toString();
    var urlArray = [];
    var url;
    var matchArray;

    // Regular expression to find FTP, HTTP(S) and email URLs.
    //var regexToken = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;

    //http://rodneyrehm.de/t/url-regex.html
    //var regexToken = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;

    //sc2tv.ru (http://chat.sc2tv.ru/js/chat.js?v=44)
    var regexToken = new RegExp(
        '((?:(?:ftp)|(?:https?))(?:://))' + // протокол (1)
            // URL без протокола (2)
            '(((?:(?:[a-z\u0430-\u0451\\d](?:[a-z\u0430-\u0451\\d-]*[a-z\u0430-\u0451\\d])*)\\.)+(?:[a-z]{2,}|\u0440\u0444)' + // хост (3)
            '|(?:(?:\\d{1,3}\\.){3}\\d{1,3}))' + // хост в формате IPv4 (3)
            '(:\\d+)?' + // порт (4)
            '(/[-a-z\u0430-\u0451\\d%_~\\+\\(\\):]*(?:[\\.,][-a-z\u0430-\u0451\\d%_~\\+\\(\\):]+)*)*' + // путь (5)
            '(\\?(?:&amp;|[:;a-z\u0430-\u0451\\d%_~\\+=-])*)?' + // параметры (6)
            '(#(?:&amp;|[:;a-z\u0430-\u0451\\d%_~\\+=-])*)?)' // якорь (7)
        , 'gi'
    );


    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }

    return urlArray;
}


/*
 * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
 * */
function GUID ()
{
    var S4 = function ()
    {
        return Math.floor(
            Math.random() * 0x10000 /* 65536 */
        ).toString(16);
    };

    return (
        S4() + S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + "-" +
            S4() + S4() + S4()
        );
}


function DateFormat(date, format)
{
    var day     = date.getDate();
    var month   = date.getMonth()+1;
    var year    = date.getFullYear();
    var hours   = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var result = format;

    result = result.replace("Y",year);
    result = result.replace("m",month < 10 ? '0'+month : month);
    result = result.replace("d",day < 10 ? '0'+day : day);
    result = result.replace("H",hours < 10 ? '0'+hours : hours);
    result = result.replace("i",minutes < 10 ? '0'+minutes : minutes);
    result = result.replace("s",seconds < 10 ? '0'+seconds : seconds);

    return result;
}

/*
 http://stackoverflow.com/questions/9714525/javascript-image-url-verify
* */
function IsURLImage(url)
{
    return(url.match(/\.(jpeg|jpg|gif|png|tif|tiff|pcx|bmp)$/) != null);
}