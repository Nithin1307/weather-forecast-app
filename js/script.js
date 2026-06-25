$("#search").click(function(){
    let city=$("#city").val();
    let apiKey="d9256fa1f9cea12068a1956446923581";
    let current="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
    let forecast="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=metric";
    
    $.get(current,function(data){
        $("#weather").html(
            "<h3>"+data.name+"</h3>"+"<h1>"+Math.round(data.main.temp)+"°C</h1>"+"<p>Humidity : "+data.main.humidity+"%</p>"+"<p>Wind : "+data.wind.speed+" m/s</p>"
        );
    }).fail(function(){
        $("#weather").html("<h3>❌ City not found!</h3>");
        $("#forecast").html("");
    });;

    $.get(forecast,function(data){
        let result="";
        let days=data.list.filter(function(item){
            return item.dt_txt.includes("12:00:00");
        });

        $.each(days,function(index,value){
            let date=new Date(value.dt_txt);
            result+="<div class='day'>"+"<h4>"+date.toLocaleDateString('en-US',{weekday:'short'})+"</h4>"+"<img src='https://openweathermap.org/img/wn/"+value.weather[0].icon+"@2x.png'>"+"<p>"+Math.round(value.main.temp)+"°C</p>"+"</div>";
        });
        $("#forecast").html(result);
    });
});