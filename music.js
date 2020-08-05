// Mythium Archive: https://archive.org/details/mythium/
let myData = [];
jQuery(function ($) {
    getMusic();

    'use strict'
    const supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        let loadTrack = function (id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
            updateDownload(id, audio.src);
        };
        let updateDownload = function (id, source) {
            player.on('loadedmetadata', function () {
                $('a[data-plyr="download"]').attr('href', source);
            });
        };
        let playTrack = function (id) {
            loadTrack(id);
            audio.play();
        };
// initialize plyr
        const player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume',
                'download'
            ]
        });

        // initialize playlist and controls
        let index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            tracks = myData,
            buildPlaylist = $.each(tracks, function (key, value) {
                let trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('正在播放...');
            }).on('pause', function () {
                playing = false;
                npAction.text('暂停...');
            }).on('ended', function () {
                npAction.text('暂停...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                const id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            });
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // no audio support
        $('.column').addClass('hidden');
        const noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});

function getMusic() {

    $.ajax({
        url:'http://139.196.197.177:10250/?time=' + new Date().getMinutes(),
        type: 'GET',
        async: false,
        success: function (data) {
            myData = data;
            $.each(data,function (i,list) {
                myData[i].track = i+1;
                myData[i].name = list.name;
                myData[i].duration = list.person;
                myData[i].file = list.path;
            })
        }
    });
}