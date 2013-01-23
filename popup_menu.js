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

$(document).ready(function()
{
    $("#menuitem-1010,#menuitem-1012,#menuitem-1013").hover(
    function()
    {
       $(this).addClass("x-menu-item-active");
    },
    function()
    {
       $(this).removeClass("x-menu-item-active");
    }).find("a").click(function()
    {
       window.open($(this).attr("href"), "_blank");
    })
});