// Hook is an async operation
// Caller needs to treat it as such
// Needs the access token, comment to post, and video ID to post on

export const useInsertYTCommentThread = async ({token, comment, videoId}) => {
    const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?`
        + `part=snippet`
        + `&` + `access_token=${token}`,
        {
            method: 'POST',
            body: JSON.stringify({
                snippet: {
                    topLevelComment : {
                        snippet: {
                            'textOriginal': comment,
                        }
                    },
                    //videoId : window.location.toString().split('/').slice(-1)[0]
                    videoId : videoId,
                }
            })
        }
    );
    const jsonResponse = await response.json();

    if (jsonResponse.id) {
        const commentLink = "https://www.youtube.com/watch?v=" +
                            jsonResponse.snippet.videoId       +
                            "&lc="                             +
                            jsonResponse.id                    ;
        return ['success', commentLink] ;
    }
    else {
        return ['error', jsonResponse.error.message] ;
    }

}

export default useInsertYTCommentThread;