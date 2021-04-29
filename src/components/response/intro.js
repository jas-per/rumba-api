const Intro = () => {
    return (
        <div class="intro-text">
            <h2>interactive rum.ba api documentation</h2>
            <div>
                <p>
                    The rum.ba jukebox server implements an api that was developed 
                    by <a href="http://www.subsonic.org/pages/api.jsp" target="_blank" rel="noopener noreferrer">Subsonic</a>, 
                    a media server that exists since 2005. Quite a few apps on different systems have been 
                    developed for Subsonic, so the rum.ba jukebox server sticks closely to the original api 
                    to allow these apps to connect to rum.ba as well.
                </p>
                <p>
                    You can call the api of your rum.ba server with this app, show help texts about 
                    the endpoints with their parameters and then directly analyze the responses from your server.
                </p>
                <p>
                    Some extensions were needed to allow more functionality on the clients, these should  
                    only be new endpoints/parameters so developers can gradually upgrade their clients - 
                    differences between rum.ba server and Subsonic are highlighted in the help text.
                    A complete overview and some detailed concerns regarding the original Subsonic api can 
                    be found <a href="resources/subsonic.html" target="_blank" rel="noopener noreferrer">here</a>
                </p>
            </div>
        </div>
    )
}

export default Intro