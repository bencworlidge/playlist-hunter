
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
        //   console.log(jsonResponse.tracks.items)
        return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
        }));
        
        });

    },

    analysis(track) {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        // AUDIO ANALYSIS
        return fetch(`https://api.spotify.com/v1/audio-analysis/${track}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        }).then(response => response.json())
        .then((jsonResponse) => {
        
        console.log(jsonResponse)
        
        }); 
        
    }, 



    features(track) {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;

        //AUDIO FEATURES
        return fetch(`https://api.spotify.com/v1/audio-features/${track}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        }).then(response => response.json())
        .then((jsonResponse) => {
        
        console.log(jsonResponse)
        
        });
    }

}

export default Spotify