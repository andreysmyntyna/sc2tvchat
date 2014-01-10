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
 * Режим работы расширения. Во время разработки - 'development'. Во время публикации - 'production'.
 *
 * @global */
var EXTENSION_MODE = 'production';


/**
 * Обеспечивает функциональность log(), но с учётом режима разработчика или пользователя.
 * Возможные значения: development, production
 *
 * @param {*} info Значение, переданное log()
 */
function log(info)
{
    EXTENSION_MODE != 'development' || console.log(info);
}

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

    //sc2tv.ru (http://chat.sc2tv.ru/js/chat.js?v=44)


    // Iterate through any URLs in the text.
    while( (matchArray = regexToken.exec( source )) !== null )
    {
        var token = matchArray[0];
        urlArray.push( token );
    }

    return urlArray;
}

/**
 * Генерирует уникальное значение
 *
 * @author <a href="http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript">John Millikin</a>
 *
 * @returns {String} Строка вида 9f451369-8283-77e9-f2af-e4ea147cfbbf
 * */
function GUID ()
{
    var S4 = function ()
    {
        return Math.floor( Math.random() * 0x10000 /* 65536 */ ).toString(16);
    };

    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

/**
 * Представляет объект Date строкой.
 * Синтаксис шаблона:
 * Y - год, 4-ре цифры
 * m - месяц, 2-ве цифры
 * d - день, 2-ве цифры
 * H - часы, 2-ве цифры
 * i - минуты, 2-ве цифры
 * s - секунды, 2-ве цифры
 *
 * @param {Date} date объект Date
 * @param {String} format Шаблон для форматирования
 *
 * @returns {String} Строковое представление даты, в соответствии с шаблоном
 * */
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

/**
 * Прямая ссылка на изображение
 *
 * @const */
const URL_TYPE_IMAGE    = 1;
/**
 * Ссылка на видео twitch.tv
 *
 * @const */
const URL_TYPE_TWITCH_VIDEO    = 2;
/**
 * Любая ссылка для которой нет специального представления
 *
 * @const */
const URL_TYPE_WEBSITE  = 3;
/**
 * Ссылка на видео Youtube.com
 *
 * @const */
const URL_TYPE_YOUTUBE_VIDEO  = 4;
/**
 * Прямая ссылка на файл SWF
 *
 * @const */
const URL_TYPE_SWF       = 5;
/**
 * Ссылка на отдельный пост форума forum.sc2tv.ru
 *
 * @const */
const URL_TYPE_SC2TV_FORUM_QUOTE = 6;
/**
 * Ссылка на ветку форума forum.sc2tv.ru
 *
 * @const */
const URL_TYPE_SC2TV_FORUM_POST = 7;
/**
 * Ссылка на описание фильма kinopoisk.ru
 *
 * @const */
const URL_TYPE_KINOPOISK_RU = 8;



/**
 * Массив для быстрого перевода констант URL_TYPE_* в представление строкой и наоборот.
 * Нужен при отладке.
 *
 * @global */
var URL_TYPES = [];
URL_TYPES["URL_TYPE_IMAGE"] = URL_TYPE_IMAGE;
URL_TYPES["URL_TYPE_TWITCH_VIDEO"] = URL_TYPE_TWITCH_VIDEO;
URL_TYPES["URL_TYPE_WEBSITE"] = URL_TYPE_WEBSITE;
URL_TYPES["URL_TYPE_YOUTUBE_VIDEO"] = URL_TYPE_YOUTUBE_VIDEO;
URL_TYPES["URL_TYPE_SWF"] = URL_TYPE_SWF;
URL_TYPES["URL_TYPE_SC2TV_FORUM_QUOTE"] = URL_TYPE_SC2TV_FORUM_QUOTE;
URL_TYPES["URL_TYPE_SC2TV_FORUM_POST"] = URL_TYPE_SC2TV_FORUM_POST;
URL_TYPES["URL_TYPE_KINOPOISK_RU"] = URL_TYPE_KINOPOISK_RU;
URL_TYPES[URL_TYPE_IMAGE] = "URL_TYPE_IMAGE";
URL_TYPES[URL_TYPE_TWITCH_VIDEO] = "URL_TYPE_TWITCH_VIDEO";
URL_TYPES[URL_TYPE_WEBSITE] = "URL_TYPE_WEBSITE";
URL_TYPES[URL_TYPE_YOUTUBE_VIDEO] = "URL_TYPE_YOUTUBE_VIDEO";
URL_TYPES[URL_TYPE_SWF] = "URL_TYPE_SWF";
URL_TYPES[URL_TYPE_SC2TV_FORUM_QUOTE] = "URL_TYPE_SC2TV_FORUM_QUOTE";
URL_TYPES[URL_TYPE_SC2TV_FORUM_POST] = "URL_TYPE_SC2TV_FORUM_POST";
URL_TYPES[URL_TYPE_KINOPOISK_RU] = "URL_TYPE_KINOPOISK_RU";



/**
 * Регулярное выражение, представляющее шаблон для обнаружения URL в строке.
 * Обнаружено в файле http://chat.sc2tv.ru/js/chat.js?v=44
 *
 * @global */
var URL_REG_EXP = new RegExp(
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

/**
* Осуществляет поиск всех вхождений шаблона в строке str
*
* @param {String} str Строка в которой будет осуществляться поиск совпадений
* @returns {Array} Все совпадения с шаблоном в виде массива. Если совпадений необнаружено - массив пуст.
* */
RegExp.prototype.Matches = function(str)
{
    var result = [];
    var match = null;
    while((match = this.exec(str)) != null)  result[result.length] = match[0];
    return result;
};

/**
 * Поиск всех ссылок.
 *
 * @returns {Array} Массив с ссылками, найденными в соответствии с шаблоном URL_REG_EXP.
 */
String.prototype.Links = function()
{
    return URL_REG_EXP.Matches(this);
};

/**
 * Даёт ответ на вопрос является ли строка прямой ссылкой на изображение.
 * Простой вариант, проверяющий просто расширение файла на соответствие расширениям файлов основных графических форматов.
 *
 * @returns {Boolean} True - если строка ссылка на изображение, False - в противном случае.
**/
String.prototype.DirectImageLink = function()
{
    return (/\.(jpeg|jpg|gif|png|tif|tiff|pcx|bmp)$/).test(this);
};


String.prototype.KinopoiskLink = function() {
    return (/kinopoisk\.ru\/film\/\d+/).test(this);
};

String.prototype.getKinopoiskUrlData = function() {
    var kinopoiskData = $.Deferred();

    var kinopoiskRequest = {
        type: "GET",
        crossDomain: true,
        url: this,
        dataType: 'text'
    };

    $.ajax(kinopoiskRequest).success(function(data) {
        var $dom = $(data);
        var $description = $dom.find('.brand_words[itemprop="description"]');
        var $previewImage = $dom.find('#photoBlock img[itemprop="image"]');
        var $posterAwaiting = $dom.find('#await_percent');
        var $posterYear = $dom.find('#infoTable .info tr:first-child td:nth-child(2)');
        var $posterVotes = $dom.find('#block_rating [itemprop="ratingValue"]');
        var $posterIMDb = $dom.find('#block_rating .div1+div:contains("IMDb")');

        var posterDescription = $description.text();
        var posterSrc = $previewImage.get(0).src;
        var posterAlt = $previewImage.attr('alt') || '';

        var posterAwaiting = (function() {
            var percent = parseInt($posterAwaiting.text());
            if(isNaN(percent)) percent = '';
            return percent;
        })();
        var posterYear = $posterYear.text().trim();
        var posterVotes = $posterVotes.attr('content') || '';
        var posterIMDb = (function() {
            var imdb = parseFloat((/\s\d+\.\d+\s/ig).Matches($posterIMDb.text())[0]);
            if(isNaN(imdb)) imdb = '';
            return imdb;
        })();

        var success = true;
        kinopoiskData.resolveWith(window, [success, posterAlt, posterSrc, posterDescription, posterAwaiting, posterYear, posterVotes, posterIMDb]);
    }).error(function() {
        var success = false;
        kinopoiskData.resolveWith(window, [success, '', '', '', '', '', '', '']);
    });

    $.ajax(kinopoiskRequest).success(function(data) {
            console.log($(data).find('.brand_words[itemprop="description"]').text());
    });

    return kinopoiskData.promise();
};

/**
 * Функция позволяет проверить является ли строка равной одной из перечисленных.
 * В качестве параметра может принимать массив строк, строку, объект, любое колличество массивов строк,
 * объектов или строк в любой комбинации.
 * 
 * @param {*} strings Строки для сравнения с текущей
 *
 * @returns {Boolean} True - если строка равна одной из перечисленных результат - True, во всех остальных случаях - False
 **/
String.prototype.OneOf = function(strings) 
{
    for(var i =0; i< arguments.length; i++)
    {
        switch(typeof(arguments[i]))
        {
            default:
            case "string":
                if (arguments[i] == this) return true;
            break;
            case "object":
                for(var key in arguments[i])
                {
                    if(arguments[i][key] == this) return true;
                }
            break;
        }
    }
    return false;
};


/**
 * Получает значение параметра из URL по его имени
 *
 * @param {String} param_name Имя параметра из ссылки http://ru.wikipedia.org/wiki/Special:Search?search=github&go=Go можно получить значения параметров "search" и "go"
 *
 * @returns {String} Если параметр, имя которого указано в параметре param_name существует будет получено его значение, в противном случае пустая строка
 **/
String.prototype.Param = function(param_name)
{
    return url('?'+param_name, this);
};


/**
 * Проверка на существование именованного параметра. Однозначно существование параметра функция определить не может. Если его нет в ссылке или параметр имеет пустое значение будет возвращена пустая строка.
 *
 * @param {String} param_name Имя параметра
 *
 * @returns {String} Пустая строка или значение параметра.
 **/
String.prototype.HasParam = function(param_name)
{
    return this.Param(param_name).Empty();
};

/**
 * Возвращает часть пути в ссылке по его номеру. Из следующей ссылки могут быть получены значения 1 - wiki, 2 - Special:Search http://ru.wikipedia.org/wiki/Special:Search?search=github&go=Go
 *
 * @param {Number} url_part_number Номер части URL
 *
 * @returns {String} Пустая строка или соответствующее значение.
 **/
String.prototype.UrlPart = function(url_part_number)
{
    return url(url_part_number, this);
};

/**
 * Проверяет неравенство строк
 *
 * @param {String} str Строка для сравнения с текущей
 *
 * @returns {Boolean} True - строки неравны, False - равны
 **/
String.prototype.not = function(str)
{
    return this != str;
};

/**
 * Проверяет неравенство строк
 *
 * @param {String} str Строка для сравнения с текущей
 *
 * @returns {Boolean} True - строки неравны, False - равны
 **/
String.prototype.is = function(str)
{
    return this == str;
};

/**
 * Проверяет пустая ли строка
 *
 * @returns {Boolean} True - строка пуста, False - равны
 **/
String.prototype.Empty = function()
{
    return this.length > 0;
};

/**
 * Проверяет является ли строка ссылкой на видео Youtube
 * URL может иметь следующий вид:
 * 1. http://www.youtube.com/watch?v=XYqZCHsgLVA
 * 2. http://youtu.be/XYqZCHsgLVA
 * 3. http://www.youtube.com/embed/XYqZCHsgLVA
 *
 * @returns {Boolean} True - ссылка на видео, False - нет
 **/
String.prototype.YoutubeVideoLink = function()
{
    return (this.Domain().is("youtube.com") && (this.HasParam("v") || this.UrlPart(1).is("embed")))
        || this.Domain().is("youtu.be");
};


String.prototype.TwitchVideoLink = function()
{
    return this.Domain().is("twitch.tv");
};

String.prototype.TwitchVideoChannel = function()
{

};

String.prototype.TwitchVideoChapter = function()
{

};


/**
 * Возвращает код видео из ссылки на Youtube
 * URL может иметь следующий вид:
 * 1. http://www.youtube.com/watch?v=XYqZCHsgLVA
 * 2. http://youtu.be/XYqZCHsgLVA
 * 3. http://www.youtube.com/embed/XYqZCHsgLVA
 *
 * @returns {String} Код ссылки или пуста строка
 **/
String.prototype.YoutubeVideoCode = function()
{
    if(this.HasParam("v"))
    {
        return this.Param("v");
    }
    else if(this.UrlPart(1).is("embed"))
    {
        return this.UrlPart(2);
    }
    return "";
};



/**
 * Если строка является правильным URL, функция вернёт доменное имя. Если хост указан IP адресом, то функция вернёт два последних разряда, разделённых точкой.
 *
 * @returns {String} Доменное имя ресурса. Результат содержит домен первого уровня
 **/
String.prototype.Domain = function()
{
    return url("domain", this);
};

/**
 * Если строка является правильным URL, функция вернёт полное доменное имя или IP адрес.
 *
 * @returns {String} Полное доменное имя, включая поддомены.
 **/
String.prototype.HostName = function()
{
    return url("hostname", this);
};

/**
 * Если строка является правильным URL, то функция вернёт константу, представляющую один из типов ссылок, поддерживаемых расширением.
 *
 * @returns {Number} Значение одной из констант URL_TYPE_*
 **/
String.prototype.ResourceType = function()
{

    if (this.DirectImageLink())
    {
        return URL_TYPE_IMAGE;
    }
    else if (this.YoutubeVideoLink())
    {
        return URL_TYPE_YOUTUBE_VIDEO;
    }
    else if (this.KinopoiskLink()) {
        return URL_TYPE_KINOPOISK_RU;
    }

    return URL_TYPE_WEBSITE;
};