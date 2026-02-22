$(document).ready(function () {

    let movies = [];
console.log(movies);
    function loadXML() {
        $.ajax({
            url: "movies.xml",
            type: "GET",
            dataType: "xml",
            success: function (data) {
                $(data).find("movie").each(function () {
                    let movie = {
                        title: $(this).find("title").text(),
                        director: $(this).find("director").text(),
                        genre: $(this).find("genre").text(),
                        price: parseFloat($(this).find("price").text()),
                        date: $(this).find("release_date").text()
                    };
                    movies.push(movie);
                });
                displayTable(movies);
            }
        });
    }

    function displayTable(data) {
        let rows = "";
        $.each(data, function (i, movie) {
            rows += "<tr>" +
                "<td>" + movie.title + "</td>" +
                "<td>" + movie.director + "</td>" +
                "<td>" + movie.genre + "</td>" +
                "<td>₹" + movie.price + "</td>" +
                "<td>" + movie.date + "</td>" +
                "</tr>";
        });
        $("#movieTable tbody").html(rows);
    }

    function filterMovies() {
        let genre = $("#genreFilter").val().toLowerCase();
        let director = $("#directorFilter").val().toLowerCase();
        let min = $("#minPrice").val();
        let max = $("#maxPrice").val();

        let filtered = movies.filter(function (movie) {
            return (genre === "" || movie.genre.toLowerCase() === genre) &&
                   (director === "" || movie.director.toLowerCase().includes(director)) &&
                   (min === "" || movie.price >= min) &&
                   (max === "" || movie.price <= max);
        });

        displayTable(filtered);
    }

    $("#filterBtn").click(function () {
        filterMovies();
    });

    loadXML();
});