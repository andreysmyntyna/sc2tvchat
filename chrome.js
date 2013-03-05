/**
 * Created with JetBrains PhpStorm.
 * Author: Andrey Smyntyna
 * Email: andreysmyntyna@gmail.com
 * Date: 05.03.13
 * Time: 22:06
 */

/**
 * Позволяет указать на каких страницах активировать расширение
 *
 * @param {Array} hosts Массив строк с доменными именами страниц на которых расширение необходимо активировать, например ["sc2tv.ru", "www.sc2tv.ru"]
 *
 */

function SphereOfActivity(hosts)
{
  var WaitForPage = function (tabId, changeInfo, tab)
  {
      !tab.url.HostName().OneOf(hosts) || chrome.pageAction.show(tabId);
  };
  chrome.tabs.onUpdated.addListener(WaitForPage);
}

