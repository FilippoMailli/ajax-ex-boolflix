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

    var sourceSerie = $("#serie-template").html();
    var serieTemplate = Handlebars.compile(sourceSerie);

    var apiBaseUrl = 'https://api.themoviedb.org/3';
    var ricercaFilm = '/search/movie';
    var ricercaSerie = '/search/tv';
    var posterpathIncompleta = 'https://image.tmdb.org/t/p/w342';

    $('#barra-ricerca').keypress(function(event) {
         if(event.keyCode == 13) {
              trovaFilm();
         }
    });

    $('#pulsante-ricerca-film').click(trovaFilm);

    $('#pulsante-ricerca-serie').click(trovaSerie);

    function trovaSerie() {
        $('.card-serie').remove();
        $('.card-film').remove();
        var titoloSerieCercato = $('#barra-ricerca').val();
        $.ajax({
            url: apiBaseUrl + ricercaSerie,
            data: {
                api_key: 'e99307154c6dfb0b4750f6603256716d',
                query: titoloSerieCercato,
                lenguage: 'it-IT',
            },
            method: 'GET',
            success: function (dataSerie) {
                var series = dataSerie.results;
                for(var i = 0; i < series.length; i++) {
                    var serie = series[i];
                    var titoloTemplateSerie = {
                        titolo: serie.name,
                        titoloOriginale: serie.original_name,
                        lingua: serie.original_language,
                        voto: serie.vote_average,
                        voto_stelle: stars(serie.vote_average),
                        bandiera: flags(serie.original_lenguage),
                        poster: creaPoster(posterpathIncompleta, serie.poster_path),
                        overview: serie.overview
                    }
                    var cardserie = serieTemplate(titoloTemplateSerie);
                    $('.container-serie').append(cardserie);
                }
                $('.card-serie').on('mouseenter', function(event){
                    $(this).children('#poster-card').css("display", "none");
                  });
                  $('.card-serie').on('mouseleave', function(event){
                    $(this).children('#poster-card').css("display", "block");
                  });
            },
            errore: function (err) {
                alert('ERRORE GENERICO');
            }
        })
        titoloSerieCercato = $('#barra-ricerca').val('');
    };

    function trovaFilm() {
        $('.card-film').remove();
        $('.card-serie').remove();
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
                        voto: film.vote_average,
                        voto_stelle: stars(film.vote_average),
                        bandiera: flags(film.original_language),
                        poster: creaPoster(posterpathIncompleta, film.poster_path),
                        overview: film.overview
                    }
                    var cardfilm = filmTemplate(titoloTemplate);
                    $('.container-film').append(cardfilm);
                }
                $('.card-film').on('mouseenter', function(event){
                    $(this).children('#poster-card').css("display", "none");
                  });
                  $('.card-film').on('mouseleave', function(event){
                    $(this).children('#poster-card').css("display", "block");
                  });
            },
            errore: function (err) {
                alert('ERRORE GENERICO');
            }

        })
        titoloCercato = $('#barra-ricerca').val('');
    };


    function stars(vote) {
        vote = Math.floor(vote / 2);
        var stringaStelle = '';
            for(var i = 1; i <= 5; i ++) {
                if( i <= vote ) {
                    stringaStelle += '<i class="fas fa-star"></i>';
                } else {
                    stringaStelle += '<i class="far fa-star"></i>';
                }
            }
            return stringaStelle;
    };

    function flags(nazione) {
        switch (nazione) {
            case 'it':
                return 'https://www.countryflags.io/' + nazione + '/flat/64.png';
                break;
            case 'fr':
                return 'https://www.countryflags.io/' + nazione + '/flat/64.png';
                break;
            case 'es':
                return 'https://www.countryflags.io/' + nazione + '/flat/64.png';
                break;
            case 'de':
                return 'https://www.countryflags.io/' + nazione + '/flat/64.png';
                break;
            default:
                return 'https://www.countryflags.io/' + 'us' + '/flat/64.png';
        }
    };

    function creaPoster(percorsoBase, aggiuntaPercorso){
        if(aggiuntaPercorso !== null) {
            return percorsoBase + aggiuntaPercorso;
        } else {
            return 'img/poster.jpg';
        }
    };



});
