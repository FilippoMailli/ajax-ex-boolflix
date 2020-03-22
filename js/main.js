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

    $('#barra-ricerca').keypress(function(event) {
         if(event.keyCode == 13) {
              trovaFilm();
         }
    });
    $('#pulsante-ricerca').click(trovaFilm);

    function trovaFilm() {
        $('.card-film').hide();
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
                var films = data.results;
                for(var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var titoloTemplate = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: stars(film.vote_average),
                        bandiera: flags(film.original_language)
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
    };

    function arrotondaVotazione(votazione){
        var votoArrotondato = Math.floor(votazione);
        return votoArrotondato / 2;
    }

    function stars(vote){
        var stelle = Math.floor(vote / 2);
        var stelline;
        switch (stelle) {
            case 0:
                stelline = '&star;&star;&star;&star;&star;';
                break;
            case 1:
                stelline = '&starf;&star;&star;&star;&star;';
                break;
            case 2:
                stelline = '&starf;&starf;&star;&star;&star;';
                break;
            case 3:
                stelline = '&starf;&starf;&starf;&star;&star;';
                break;
            case 4:
                stelline = '&starf;&starf;&starf;&starf;&star;';
                break;
            case 5:
                stelline = '&starf;&starf;&starf;&starf;&starf;';
                break;
            default:
                stelline = 'Votazione non disponibile';
        }
        return stelline;
    };      //funzione crea stelle del voto

    function flags(nazione) {
        if (nazione == 'it') {
            return 'https://www.countryflags.io/it/flat/64.png';
        } else {
            return 'https://www.countryflags.io/us/flat/64.png'
        }
    };

});
