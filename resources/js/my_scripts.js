
function makeAPICall() {
    var search = document.getElementById("search").value;
    var max = 30;
    url = `https://reststop.randomhouse.com/resources/works/?start=0&max=${max}&expandLevel=1&search=${search}`;

    $.ajax({url:url, dataType:"json"}).then(function(data) {
        console.log(data);


        var cards = "<div class='row'>";
        for(i = 0; i < data.work.length; i++) {
            var books = data.work[i];
            cards += `            
            <div class="card" style="margin:2%;width:27%;">
                <br>
                <div class="card-body" style="vertical-align:middle;height:4cm;">
                    <br>
                    <h5 class="card-title">${books.titleweb}</h5>
                    <p class="card-text"> ${books.authorweb} </p>
                </div>
                    <button href="#reviewModal" class="myButton" data-toggle="modal" onclick="createReview('${books.titleweb}')"> Add Review </button>
                <br>
            </div>
            `
        }
        cards += "</div>";
        document.getElementById('cards_container').innerHTML = cards;
    });
}

function createReview(title) {
    document.getElementById("book_title").value = title;
}