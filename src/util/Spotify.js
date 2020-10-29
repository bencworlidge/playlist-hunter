import queryString from 'query-string'

const Spotify = {

    search(searchQuery) {

        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        // TRACK SEARCH
        return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}%20&type=track`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        }).then(response => response.json())
        .then((jsonResponse) => {
            if (!jsonResponse.tracks) {
                return [];
            } 
            return jsonResponse.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
            }));
        
        });

    },

    async analysis(track) {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        // AUDIO ANALYSIS
        const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${track}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        });
        const jsonResponse = await response.json();
        if (!jsonResponse) {
            return [];
        }
        return jsonResponse;   
    }, 

    async features(track) {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        //AUDIO FEATURES
        const response = await fetch(`https://api.spotify.com/v1/audio-features/${track}`, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        });
        const jsonResponse = await response.json();
        if (!jsonResponse) {
            return [];
        }
        return jsonResponse;   
    }
}

async function getTrackFeatures(track) {
    const trackFeatures = await Spotify.features(track)
    return trackFeatures
}

async function getTrackAnalysis(track) {
    const trackAnalysis = await Spotify.analysis(track)
    return trackAnalysis
}

async function getTrackKey(track) {
    const trackKey = await Spotify.features(track)
    let correctScale = trackKey.key;
    console.log(trackKey)
    switch (correctScale) {
        case 0:
        correctScale = 'C'
        break;
        case 1:
        correctScale = 'C#'
        break;
        case 2:
        correctScale = 'D'
        break;
        case 3:
        correctScale = 'D#'
        break;    
        case 4:
        correctScale = 'E'
        break;
        case 5:
        correctScale = 'F'
        break;
        case 6:
        correctScale = 'F#'
        break;
        case 7:
        correctScale = 'G'
        break;
        case 8:
        correctScale = 'G#'
        break;    
        case 9:
        correctScale = 'A'
        break;
        case 10:
        correctScale = 'A#'
        break;
        case 11:
        correctScale = 'B'
        break;
        default: 
        correctScale = 'Unknown'
        return correctScale
    } 

    let correctMode = trackKey.mode;
    switch (correctMode) {
        case 1:
        correctMode = 'Major'
        break;
        case 2:
        correctMode = 'Minor'
        break;
        default:
        correctMode = 'Unknown'
        return correctMode
    }
    return correctScale + ' ' + correctMode
}

export {
    Spotify,
    getTrackAnalysis,
    getTrackFeatures,
    getTrackKey
}