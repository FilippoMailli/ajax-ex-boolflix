/*
Milestone 1:Creare un layout base con una searchbar (una input e un button)
in cui possiamoscrivere completamente o parzialmente il nome di un film.
Possiamo, cliccando ilbottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ognifilm trovato:
1.Titolo
2.Titolo Originale
3.Lingua
4.Voto
*/

$(document).ready(function() {

    var source = $("#film-template").html();
    var filmTemplate = Handlebars.compile(source);

    var apiBaseUrl = 'https://api.themoviedb.org/3';
    var ricercaFilm = '/search/movie';

    $('#pulsante-ricerca').click(function() {
        var titoloCercato = $('#barra-ricerca').val();
        $.ajax({
            url: apiBaseUrl + ricercaFilm,
            data: {
                api_key: '44b6628b95f78f7a5c0a2b6343604943',
                query: titoloCercato,
                language: 'it-IT',
            },
            method: 'GET',
            success: function (data) {
                console.log(data);
                var films = data.results;
                for(var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var titoloTemplate = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: film.vote_average
                    }
                    var cardfilm = filmTemplate(titoloTemplate);
                    $('.container-film').append(cardfilm);
                }
            },
            errore: function (err) {
                alert('ERRORE GENERICO');
            }
        })
        titoloCercato = $('#barra-ricerca').val('');
    });





});
