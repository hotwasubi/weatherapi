
function search() {
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/weather?appid=f5fc1f0c026376dc2fa96613dd6217cf&q=' + srchbx.value;
    var forecastQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?appid=f5fc1f0c026376dc2fa96613dd6217cf&q=' + srchbx.value;
    var fdIndex =  [7,14,21,28,35];

    $.ajax({
        url: weatherQueryUrl,
        method: 'get'
    }).then(function(res) {
        $('#city').html(res.name + ', ' + res.sys.country);
        $('#temp').html(Math.floor(res.main.temp * 1.8 - 459.76) + ' &#176;F');
        $('#humid').html(res.main.humidity + '%');
        $('#wind').html(res.wind.speed + ' mph');
        $('.days').html('');
        $('#tdIcon').attr('src', 'https://openweathermap.org/img/wn/' + res.weather[0].icon + '@2x.png');

        var uvQueryUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=06e67d1c01fd425c507533b8a4c46d90&lat='+ res.coord.lat + '&lon=' + res.coord.lon;
       
        $.ajax({
            url: uvQueryUrl,
            method: 'get'
        }).then(function(resp) {
            $('#uv').html(resp.value)
            if (resp.value <= 3) {
                $('#uv').attr('class', 'green info')
            } else if (resp.value <= 6 && resp.value > 3) {
                $('#uv').attr('class', 'yellow info')
            } else if (resp.value <= 8 && resp.value > 6) {
                $('#uv').attr('class', 'orange info')
            } else {
                $('#uv').attr('class', 'red info')
            }
        })
    });
    $.ajax({
        url: forecastQueryUrl,
        method: 'get'
    }).then(function(res) {
        for (i = 0; i < 5; i++) {
            $('.days').append('<div class="col-sm day">' + moment().add(1 + i, 'days').format('MMMM Do') + '<img class="fdIcon' + i + '"><br> Temp: ' + Math.floor(res.list[fdIndex[i]].main.temp * 1.8 -459.76) + ' &#176;F<br> Humidity: ' + res.list[fdIndex[i]].main.humidity + '%</div>');
            $('.fdIcon' + i).attr('src', 'https://openweathermap.org/img/wn/' + res.list[fdIndex[i]].weather[0].icon + '.png')
        }
    });
};


search();

$('#date').html(moment().format(' MMMM Do YYYY'))

$('#srchbtn').click(function() {
    
    search();
    $('#srchbx').attr('value', '');
});

$('#srchbx').keypress(function(e) {
    var keycode = (e.keyCode);
    if(keycode == '13'){
        
        search();
        $('#srchbx').attr('value', '');
    }
});