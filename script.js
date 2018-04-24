var APIkey = "42f881c0df5f0686c0f682daae8ee93e";
var cel = false;
var wd;

function showTemp(Ftemp, c) {
    if (c) return Math.round((Ftemp - 32) * (5 / 9)) + " C";
    return Math.round(Ftemp) + " F";
}

function render(wd, cel) {
    var city = wd.name;
    var country = wd.sys.country;
    var temp = showTemp(wd.main.temp, cel);
    var desc = wd.weather[0].description;
    var icon = wd.weather[0].icon;

    $("#city").html(city);
    $("#country").html(country);
    $("#temp").html(temp);
    $("#desc").html(desc);

    var iconSrc = "http://openweathermap.org/img/w/" + icon + ".png";
    $("#temp").prepend('<img src="' + iconSrc + '">');
}

$(function () {

    var loc;

    $.getJSON('https://ipinfo.io', function (d) {
        console.log('assigning the data...')
        loc = d.loc.split(",");
        console.log(loc);

        $.getJSON('https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + APIkey, function (apiData) {
            wd = apiData;

            render(apiData, cel);

            $("#toggle").click(function () {
                cel = !cel;
                render(wd, cel);
            });

        });

    });

});