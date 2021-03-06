// ResultsGraphMaker = function(gameObject){
//     this.makeBadassGraphdude(gameObject);
// };

// ResultsGraphMaker.prototype = {
//     makeBadassGraphdude: function(){
        // var score_n = gameObject[:n]
        // var game_mode = gameObject[:gameMode]
        // var score_game_rounds = gameObject[:rounds]
        // var color_correct = new Array();
        // var sound_correct = new Array();
        // var position_correct = new Array();
        // if(game_mode === "Single"){
        //     game_mode_integer = 1
        // }
        // if(game_mode === "Dual"){
        //     game_mode_integer = 2
        // }
        // if(game_mode === "Triple"){
        //     game_mode_integer = 1
        // }
        //     for(i=0; i<score_game_rounds.length; i++){
        //         if(score_game_rounds[(i+score_n)].colorGuess == true){
        //             color_correct.push(score_game_rounds[(i+score_n)])
        //         }
        //         if(score_game_rounds[(i+score_n)].soundGuess == true){
        //             sound_correct.push(score_game_rounds[(i+score_n)])
        //         }
        //         if(score_game_rounds[(i+score_n)].positionGuess == true){
        //             position_correct.push(score_game_rounds[(i+score_n)])
        //         }
        //     }
        //     var total_correct_length = color_correct.length + sound_correct.length + position_correct.length
        //     var total_incorrect_length = (20*game_mode_integer) - total_correct_length
        //     var hit = Math.round(total_correct_length / (20*game_mode_integer) * 100);
        //     var miss = 100 - hit
        //     var color_hit = Math.round((color_correct.length/total_correct_length) * hit)
        //     var audio_hit = Math.round((sound_correct.length/total_correct_length) * hit)
        //     var position_hit = Math.round((position_correct.length/total_correct_length) * hit)
        //     var color_miss = Math.round(((20-color_correct.length)/total_incorrect_length) * miss)
        //     var audio_miss = Math.round(((20-sound_correct.length)/total_incorrect_length) * miss)
        //     var position_miss = Math.round(((20-position_correct.length)/total_incorrect_length) * miss)


//     }
// }



var ready;
ready = function() {

    if ((window.location.href.indexOf('profile'))>-1){
        var valid_game = {
            n: 2,
            rounds: {
                "1": {
                    color_id: 1,
                    audio_id: 1,
                    color_correct: true,
                    audio_correct: false
                },
                "3": {
                    color_id: 2,
                    audio_id: 3,
                    color_correct: true,
                    audio_correct: false
                },
                "2": {
                    color_id: 4,
                    audio_id: 2,
                    color_correct: false,
                    audio_correct: true
                },
                "4": {
                    color_id: 4,
                    audio_id: 2,
                    color_correct: true,
                    audio_correct: true
                },
                "5": {
                    color_id: 1,
                    audio_id: 1,
                    color_correct: false,
                    audio_correct: false
                },
                 "6": {
                    color_id: 1,
                    audio_id: 1,
                    color_correct: true,
                    audio_correct: false
                }
            }
        }
        var rounds = valid_game.rounds
        var array_values = new Array();
        var color_correct = new Array();
        var audio_correct = new Array();
        for (var key in rounds) {
            array_values.push(rounds[key]);
        }
        for (i=0; i<array_values.length; i++){
          if(array_values[i].color_correct === true){
              color_correct.push(array_values[i])
          if(array_values[i].audio_correct === true){
              audio_correct.push(array_values[i])
            }
          }
        }

        var total_correct_length = color_correct.length + audio_correct.length
        var total_incorrect_length = 12 - total_correct_length
        var hit = Math.round(total_correct_length / 12 * 100);
        var miss = 100 - hit
        var color_hit = Math.round((color_correct.length/total_correct_length) * hit)
        var audio_hit = Math.round((audio_correct.length/total_correct_length) * hit)
        var color_miss = Math.round(((6-color_correct.length)/total_incorrect_length) * miss)
        var audio_miss = Math.round(((6-audio_correct.length)/total_incorrect_length) * miss)


        $(function () {
                var colors = Highcharts.getOptions().colors,
                    categories = ['Hit', 'Miss'],
                    name = 'Answers!',
                    data = [{
                            y: hit,
                            color: colors[5],
                            drilldown: {
                                name: 'Hit',
                                categories: ['Color', 'Audio'],
                                data: [color_hit, audio_hit],
                                color: colors[5]
                            }
                        }, {
                            y: miss,
                            color: colors[2],
                            drilldown: {
                                name: 'Miss',
                                categories: ['Color', 'Audio'],
                                data: [color_miss, audio_miss],
                                color: colors[2]
                            }
                        }];

                // Build the data arrays
                var browserData = [];
                var versionsData = [];
                for (var i = 0; i < data.length; i++) {

                    // add browser data
                    browserData.push({
                        name: categories[i],
                        y: data[i].y,
                        color: data[i].color
                    });

                    // add version data
                    for (var j = 0; j < data[i].drilldown.data.length; j++) {
                        var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
                        versionsData.push({
                            name: data[i].drilldown.categories[j],
                            y: data[i].drilldown.data[j],
                            color: Highcharts.Color(data[i].color).brighten(brightness).get()
                        });
                    }
                }

                $('#graph_container').highcharts({
                    credits: {
                        enabled: false
                    },
                    chart: {
                        type: 'pie'
                    },
                    title: {
                        text: 'Results!'
                    },
                    yAxis: {
                        title: {
                            text: 'Percentage'
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                            center: ['50%', '50%']
                        }
                    },
                    tooltip: {
                      valueSuffix: '%'
                    },
                    series: [{
                        name: 'Answers',
                        data: browserData,
                        size: '60%',
                        dataLabels: {
                            formatter: function() {
                                return this.y > 5 ? this.point.name : null;
                            },
                            color: 'white',
                            distance: -30
                        }
                    }, {
                        name: 'Misses',
                        data: versionsData,
                        size: '80%',
                        innerSize: '60%',
                        dataLabels: {
                            formatter: function() {
                                // display only if larger than 1
                                return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
                            }
                        }
                    }]
                });

        })

    }

};

$(document).ready(ready);
$(document).on('page:load', ready);
