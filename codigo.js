function getJson(){
    var input = $("input").val();
    
    $.ajax({
        url: "http://www.omdbapi.com/?s=" + input + "&page=" + ++cont + "&r=json",
        dataType: 'json',
        success: function(result){
            reloadIcon(false);
            selectData(result);
        }
    });
}

function selectData(d){
    if (d.Search == null) {
        $("input").attr("placeholder", "___MOVIE NOT FOUND___")
        .val("");
    }
    else {
        for (var i=0; i<10; i++){
            showData(d.Search[i].Poster, d.Search[i].Title, d.Search[i].Year);
        }
    }
}

function showData(p, t, y){
    var div1 = $("<div class='col-sm-6 col-md-4'></div");
    var div2 = $("<div class='thumbnail'></div>");
    var img = $("<img style='height: 200px;' src='" + p + "' alt='IMG NOT AVAILABLE'/>");
    var tit = ("<h3 class='tit'><b>" + t + "</b></h3>");
    var div3 = $("<div class='caption'></div>")
    .append(tit)
    .append("<p>" + y + "</p>");
    
    div2.append(img);
    div2.append(div3);
    div1.append(div2);
    $(".row").append(div1);
}

function reloadIcon(bool){
    if (bool) {
        $(".loader").show();
    } else{
        $(".loader").hide();
    }
}


$("document").ready(function(){
    reloadIcon(false);
    $(".btn").on("click", function(){
        $(".row").empty();
        cont = 0;
        getJson();
    });
    
    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            reloadIcon(true);
            getJson();
        }
    });
});