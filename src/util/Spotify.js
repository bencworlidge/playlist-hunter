
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

export {
    Spotify,
    getTrackAnalysis,
    getTrackFeatures,
}