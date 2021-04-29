const apiJSON = {
	version: '20210430',
	hint: 'Legacy Subsonic api',
	compat: 'Differences between rum.ba server and Subsonic are highlighted in the help text. A complete overview can be found here (TODO: insert link)',
	header: [
		{	name: 'u (username)',
			hint: 'Username on server',
			required: true,
			type: 'string',
			default: 'admin'
		},
		{	name: 'p (password)',
			hint: 'Password',
			required: true,
			type: 'string',
			default: 'admin'
		},
		{	name: 'v (version)',
			hint: 'Max Api version supported by the app',
			required: true,
			type: 'string',
			default: '1.16.1'
		},
		{	name: 'c (clientname)',
			hint: 'Name of the client app',
			required: true,
			type: 'string',
			default: 'testapi'
		},
		{	name: 'f (returnformat)',
			hint: 'Data format returned by server',
			required: true,
			type: 'string',
			options: ['xml','json'],
			default: 'json'
		},
		{	name: 'server',
			hint: 'Adress of the server',
			required: true,
			type: 'string',
			default: 'will be set to app origin / url'
		}
	],
	categories: [
		{	name: 'System',
			hint: 'Query the server for global infos',
			endpoints: [
				{ 	name: 'ping',
					hint: 'Test connectivity with the server. Username/password will be checked as well'
				},
				{ 	name: 'getLicense',
					hint: 'Indicate "Subsonic Premium" subscription',
					compat: 'Deprecated, always returns true'
				},
			]
		},
		{	name: 'Browsing',
			hint: 'Walk through the library folders and get meta info about artists/albums',
			endpoints: [
				{ 	name: 'getMusicFolders',
					hint: 'Returns all configured top-level music folders'
				},
				{ 	name: 'getIndexes',
					hint: 'Returns an indexed (A-Z) structure of all "artists" - the top-level folders inside your music folders',
					parameters: [
						{	name: 'musicFolderId',
							hint: 'If specified, only return artists in the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0
						},
						{	name: 'ifModifiedSince',
							hint: 'Timestamp - if specified, only return a result if the artist collection has changed since the given time ',
							required: false,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'getMusicDirectory',
					hint: 'Returns a listing of all files in a music directory. Typically used to get list of albums for an artist, or list of songs for an album',
					parameters: [
						{	name: 'id',
							hint: 'A string which uniquely identifies the music folder. Obtained by calls to getIndexes or getMusicDirectory',
							required: true,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'getGenres',
					hint: 'Returns all genres'
				},
				{ 	name: 'getArtists',
					hint: 'Similar to getIndexes, but organizes music according to ID3 tags',
					parameters: [
						{	name: 'musicFolderId',
							hint: 'If specified, only return artists in the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'getArtist',
					hint: 'Returns details for an artist, including a list of albums. Organizes music according to ID3 tags',
					parameters: [
						{	name: 'id',
							hint: 'The artist ID',
							required: true,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'getAlbum',
					hint: 'Returns details for an album, including a list of songs. Organizes music according to ID3 tags. ',
					parameters: [
						{	name: 'id',
							hint: 'The album ID',
							required: true,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'getSong',
					hint: 'Returns details for a song',
					parameters: [
						{	name: 'id',
							hint: 'The song ID',
							required: true,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'getVideos',
					hint: 'Returns all video files',
					compat: 'not implemented'
				},
				{ 	name: 'getVideoInfo',
					hint: 'Returns details for a video, including information about available audio tracks, subtitles (captions) and conversions',
					parameters: [
						{	name: 'id',
							hint: 'The video ID',
							required: true,
							type: 'int',
							min: 0
						}
					],
					compat: 'not implemented'
				},
				{ 	name: 'getArtistInfo',
					hint: 'Returns artist info with biography, image URLs and similar artists, using data from last.fm',
					parameters: [
						{	name: 'id',
							hint: 'The artist (ar-XX), album (al-XX) or song ID',
							required: true,
							type: 'string'
						},
						{	name: 'count',
							hint: 'Max number of similar artists to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'includeNotPresent',
							hint: 'Whether to return artists that are not present in the media library',
							required: false,
							type: 'boolean',
							default: false
						}
					],
					compat: 'not implemented'
				},
				{ 	name: 'getArtistInfo2',
					hint: 'use ID3 tag - returns artist info with biography, image URLs and similar artists, using data from last.fm.',
					parameters: [
						{	name: 'id',
							hint: 'The artist ID',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'count',
							hint: 'Max number of similar artists to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'includeNotPresent',
							hint: 'Whether to return artists that are not present in the media library',
							required: false,
							type: 'boolean',
							default: false
						}
					],
					compat: 'not implemented'
				},
				{ 	name: 'getAlbumInfo',
					hint: 'Returns album notes, image URLs etc, using data from last.fm',
					parameters: [
						{	name: 'id',
							hint: 'The album (al-XX) or song ID',
							required: true,
							type: 'string'
						}
					],
					compat: 'not implemented'
				},
				{ 	name: 'getAlbumInfo2',
					hint: 'use ID3 tag - returns album notes, image URLs etc, using data from last.fm',
					parameters: [
						{	name: 'id',
							hint: 'The album ID',
							required: true,
							type: 'int',
							min: 0
						}
					],
					compat: 'not implemented'
				},
				{ 	name: 'getSimilarSongs',
					hint: 'Returns a random collection of songs from the given artist and similar artists, using data from last.fm. Typically used for artist radio features',
					parameters: [
						{	name: 'id',
							hint: 'The artist (ar-XX), album (al-XX) or song ID',
							required: true,
							type: 'string'
						},
						{	name: 'count',
							hint: 'Max number of songs to return',
							required: false,
							type: 'int',
							min: 1,
							default: 50
						}
					],
					compat: 'partially implemented, only returns songs from the given artist (no last.fm integration)'
				},
				{ 	name: 'getSimilarSongs2',
					hint: 'use ID3 tag - returns a random collection of songs from the given artist and similar artists, using data from last.fm. Typically used for artist radio features',
					parameters: [
						{	name: 'id',
							hint: 'The artist ID',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'count',
							hint: 'Max number of songs to return',
							required: false,
							type: 'int',
							min: 1,
							default: 50
						}
					],
					compat: 'partially implemented, only returns songs from the given artist (no last.fm integration)'
				},
				{ 	name: 'getTopSongs',
					hint: 'Returns top songs for the given artist, using data from last.fm',
					parameters: [
						{	name: 'artist',
							hint: 'The artist name',
							required: true,
							type: 'string'
						},
						{	name: 'count',
							hint: 'Max number of songs to return',
							required: false,
							type: 'int',
							min: 1,
							default: 50
						}
					],
					compat: 'not implemented'
				}
			]
		},
		{	name: 'Library',
			hint: 'Setup / scan / update the library',
			endpoints: [
				{ 	name: 'getMusicFoldersInfo',
					hint: 'Returns status for all configured top-level music folders',
					role: 'admin'
				},
				{ 	name: 'addMusicFolder',
					hint: 'Add a new top-level music folder to the library',
					parameters: [
						{	name: 'name',
							hint: 'Arbitrary name of the new folder, has to be unique across the library',
							required: true,
							type: 'string'
						},
						{	name: 'path',
							hint: 'Full path of the new folder, has to be unique and available. Subfolders of existing music folders are not allowed',
							required: true,
							type: 'string'
						},
						{	name: 'enable',
							hint: 'Start scanning the added folder right away',
							required: false,
							type: 'boolean',
							default: false
						}
					],
					role: 'admin'
				},
				{ 	name: 'updateMusicFolder',
					hint: 'Update existing top-level music folder in the library',
					parameters: [
						{	name: 'folderid',
							hint: 'ID of the top-level music folder to be updated',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'name',
							hint: 'Rename folder, has to be unique',
							required: false,
							type: 'string'
						},
						{	name: 'enable',
							hint: 'Start scanning the updated folder right away',
							required: false,
							type: 'boolean',
							default: false
						}
					],
					role: 'admin'
				},
				{ 	name: 'scanMusicFolders',
					hint: 'Start scanning music folder(s) right away',
					parameters: [
						{	name: 'folderids',
							hint: 'One or multiple music folder IDs (comma separated list)',
							required: true,
							type: 'int',
							multiple:true
						}
					],
					role: 'admin'
				},
				{ 	name: 'removeMusicFolders',
					hint: 'Remove top-level music folder(s) from the library',
					parameters: [
						{	name: 'folderids',
							hint: 'One or multiple music folder IDs (comma separated list)',
							required: true,
							type: 'int',
							multiple:true
						}
					],
					role: 'admin'
				},
				{ 	name: 'getScanStatus',
					hint: 'Get current scan status / progress',
					role: 'admin',
					compat: 'Same signature as the endpoint introduced in Subsonic 6.1 but totally different response - afaik no client implements this anyway'
				},
				{ 	name: 'startScan',
					hint: 'Initiates a (re-)scan of all media folders',
					role: 'admin',
					compat: 'Same signature as the endpoint introduced in Subsonic 6.1 but totally different response - afaik no client implements this anyway'
				},
				{ 	name: 'stopScan',
					hint: 'Stop scan running (all folders)',
					role: 'admin'
				},
				{ 	name: 'clearStats',
					hint: 'Delete meta infos like lastPlayed and tags from all folders in the library',
					role: 'admin',
					compat: 'not implemented yet'
				}
			],
			compat: 'New endpoints for rest interface to manage the library'
		},
		{	name: 'AlbumSongLists',
			hint: 'Query the library for albums/songs with various attributes',
			endpoints: [
				{ 	name: 'getAlbumList',
					hint: 'Returns a list of random, newest, highest rated etc. albums. Similar to the album lists on the home page of the Subsonic web interface',
					parameters: [
						{	name: 'type',
							hint: 'The list type',
							required: true,
							type: 'string',
							options: ['random','newest','highest','frequent','recent','alphabeticalByName','alphabeticalByArtist','starred','byYear','byGenre']
						},
						{	name: 'size',
							hint: 'The number of albums to return (max 500)',
							required: false,
							type: 'int',
							default: 10,
							min: 1,
							max: 500
						},
						{	name: 'offset',
							hint: 'List offset for paging',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'fromYear',
							hint: 'The first year in the range. If fromYear > toYear a reverse chronological list is returned - required if type is "byYear"',
							required: false,
							type: 'int'
						},
						{	name: 'toYear',
							hint: 'The last year in the range - required if type is "byYear"',
							required: false,
							type: 'int'
						},
						{	name: 'genre',
							hint: 'The name of the genre, e.g. "Rock" - required if type is "byGenre"',
							required: false,
							type: 'string'
						},
						{	name: 'musicFolderId',
							hint: 'Only return albums from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				},
				{ 	name: 'getAlbumList2',
					hint: 'Similar to getAlbumList, but organizes music according to ID3 tags',
					parameters: [
						{	name: 'type',
							hint: 'The list type',
							required: true,
							type: 'string',
							options: ['random','newest','highest','frequent','recent','alphabeticalByName','alphabeticalByArtist','starred','byYear','byGenre']
						},
						{	name: 'size',
							hint: 'The number of albums to return (max 500)',
							required: false,
							type: 'int',
							default: 10,
							min: 1,
							max: 500
						},
						{	name: 'offset',
							hint: 'List offset for paging',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'fromYear',
							hint: 'The first year in the range. If fromYear > toYear a reverse chronological list is returned - required if type is "byYear"',
							required: false,
							type: 'int'
						},
						{	name: 'toYear',
							hint: 'The last year in the range - required if type is "byYear"',
							required: false,
							type: 'int'
						},
						{	name: 'genre',
							hint: 'The name of the genre, e.g. "Rock" - required if type is "byGenre"',
							required: false,
							type: 'string'
						},
						{	name: 'musicFolderId',
							hint: 'Only return albums from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				},
				{ 	name: 'getRandomSongs',
					hint: 'Returns random songs matching the given criteria',
					parameters: [
						{	name: 'size',
							hint: 'The maximum number of songs to return (max 500)',
							required: false,
							type: 'int',
							default: 10,
							min: 1,
							max: 500
						},
						{	name: 'fromYear',
							hint: 'Only return songs published after or in this year',
							required: false,
							type: 'int'
						},
						{	name: 'toYear',
							hint: 'Only return songs published before or in this year',
							required: false,
							type: 'int'
						},
						{	name: 'genre',
							hint: 'Only returns songs belonging to this genre',
							required: false,
							type: 'string'
						},
						{	name: 'musicFolderId',
							hint: 'Only return songs from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0
						},
						{	name: 'excludeFolderIds',
							hint: 'Only return songs not in these music folder(s)',
							required: false,
							type: 'int',
							multiple: true,
							compat: 'Extension to select/exclude multiple music folders. musicFolderId must be empty'
						}
					]
				},
				{ 	name: 'getSongsByGenre',
					hint: 'Returns songs in a given genre',
					parameters: [
						{	name: 'genre',
							hint: 'The genre, as returned by getGenres()',
							required: true,
							type: 'string'
						},
						{	name: 'count',
							hint: 'The maximum number of songs to return (max 500)',
							required: false,
							type: 'int',
							default: 10,
							min: 1,
							max: 500
						},
						{	name: 'offset',
							hint: 'List offset for paging',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'musicFolderId',
							hint: 'Only return songs from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				},
				{ 	name: 'getNowPlaying',
					hint: 'Returns what is currently being played by all users',
					compat: 'not implemented yet'
				},
				{ 	name: 'getStarred',
					hint: 'Returns starred songs, albums and artists',
					parameters: [
						{	name: 'musicFolderId',
							hint: 'Only return results from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				},
				{ 	name: 'getStarred2',
					hint: 'Similar to getStarred, but organizes music according to ID3 tags',
					parameters: [
						{	name: 'musicFolderId',
							hint: 'Only return results from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				}
			]
		},
		{	name: 'Searching',
			hint: 'Query the library for albums, artists and songs',
			endpoints: [
				{ 	name: 'search2',
					hint: 'Returns albums, artists and songs matching the given search criteria. Supports paging through the result',
					parameters: [
						{	name: 'query',
							hint: 'Search query',
							required: true,
							type: 'string'
						},
						{	name: 'artistCount',
							hint: 'Maximum number of artists to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'artistOffset',
							hint: 'List offset for paging artists',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'albumCount',
							hint: 'The maximum number of albums to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'albumOffset',
							hint: 'List offset for paging albums',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'songCount',
							hint: 'The maximum number of songs to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'songOffset',
							hint: 'List offset for paging songs',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'musicFolderId',
							hint: 'Only return results from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				},
				{ 	name: 'search3',
					hint: 'Similar to search2, but organizes music according to ID3 tags',
					parameters: [
						{	name: 'query',
							hint: 'Search query',
							required: true,
							type: 'string'
						},
						{	name: 'artistCount',
							hint: 'The maximum number of artists to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'artistOffset',
							hint: 'List offset for paging artists',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'albumCount',
							hint: 'The maximum number of albums to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'albumOffset',
							hint: 'List offset for paging albums',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'songCount',
							hint: 'The maximum number of songs to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						},
						{	name: 'songOffset',
							hint: 'List offset for paging songs',
							required: false,
							type: 'int',
							min: 0,
							default: 0
						},
						{	name: 'musicFolderId',
							hint: 'Only return results from the music folder with the given ID',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						}
					]
				}
			]
		},
		{	name: 'Playlists',
			hint: 'Store and access playlists (collection of songs)',
			endpoints: [
				{ 	name: 'getPlaylists',
					hint: 'Returns all playlists a user is allowed to access',
					parameters: [
						{	name: 'username',
							hint: 'Return playlists for this user rather than for the authenticated user',
							required: false,
							type: 'string',
							role: 'admin'
						}
					]
				},
				{ 	name: 'getPlaylist',
					hint: 'Returns a listing of files in a saved playlist if the user is allowed to access',
					parameters: [
						{	name: 'id',
							hint: 'ID of the playlist to return, as obtained by getPlaylists',
							required: true,
							type: 'int',
							min: 0
						}
					]
				},
				{ 	name: 'createPlaylist',
					hint: 'Creates (or updates) a playlist',
					parameters: [
						{	name: 'playlistId',
							hint: 'The playlist ID - required for update (only the owner of a playlist is allowed to update it)',
							required: false,
							type: 'int',
							min: 0
						},
						{	name: 'name',
							hint: 'The human-readable name of the playlist - required for create (but defaults to "YYMMDD - hh:mm:ss")',
							required: false,
							type: 'string',
							default: 'Date.now()'
						},
						{	name: 'songId',
							hint: 'ID(s) of a song in the playlist. List with one songId parameter for each song in the playlist, in the desired order',
							required: true,
							type: 'int',
							multiple:true
						}
					]
				},
				{ 	name: 'updatePlaylist',
					hint: 'Updates a playlist. Only the owner of a playlist is allowed to update it',
					parameters: [
						{	name: 'playlistId',
							hint: 'The playlist ID',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'name',
							hint: 'The human-readable name of the playlist - Not supplied = no change',
							required: false,
							type: 'string'
						},
						{	name: 'comment',
							hint: 'A playlist comment - Not supplied = no change',
							required: false,
							type: 'string'
						},
						{	name: 'public',
							hint: 'Should the playlist be visible to all users - Not supplied = no change',
							required: false,
							type: 'boolean'
						},
						{	name: 'songIdToAdd',
							hint: 'Add this song with this ID to the playlist. Multiple parameters allowed',
							required: false,
							type: 'int',
							multiple:true
						},
						{	name: 'songIndexToRemove',
							hint: 'Remove the song at this position in the playlist. Multiple parameters allowed',
							required: false,
							type: 'int',
							multiple:true
						}
					]
				},
				{ 	name: 'deletePlaylist',
					hint: 'Deletes a saved playlist - Only the owner of a playlist is allowed to delete it',
					parameters: [
						{	name: 'id',
							hint: 'The playlist ID',
							required: true,
							type: 'int',
							min: 0
						}
					]
				}
			]
		},
		{	name: 'MediaRetrieval',
			hint: 'Access media, cover, lyrics, subtitles ..',
			endpoints: [
				{ 	name: 'stream',
					hint: 'Streams a given media file',
					parameters: [
						{	name: 'id',
							hint: 'Unique identifier of the file to stream ( eg from getMusicDirectory() )',
							required: true,
							type: 'string'
						},
						{	name: 'maxBitRate',
							hint: 'If specified, the server will attempt to limit the bitrate to this value, in kilobits per second. If set to zero, no limit is imposed',
							required: false,
							type: 'int',
							min: 0,
							compat: 'Transcoding not implemented yet because for video on low-power devices we\'d need hardware accelerated encoders - while most single-board computers do have hardware encoding logic (to handle video recording) we are still a long way from just using mainline kernel + ffmpeg (2021). Will be implemented when a standard way of hw-accelerated transcoding stabilizes!'
						},
						{	name: 'format',
							hint: 'Specifies the preferred target format (e.g., "mp3" or "flv") in case there are multiple applicable transcodings. Starting with 1.9.0 you can use the special value "raw" to disable transcoding',
							required: false,
							type: 'string',
							options: ['mp3','flv','raw'],
							compat: 'Transcoding not implemented yet'
						},
						{	name: 'timeOffset',
							hint: 'Only applicable to video streaming. If specified, start streaming at the given offset (in seconds) into the video. Typically used to implement video skipping',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						},
						{	name: 'size',
							hint: 'Only applicable to video streaming. Requested video size specified as WxH, for instance "640x480"',
							required: false,
							type: 'string',
							compat: 'Transcoding not implemented yet'
						},
						{	name: 'estimateContentLength',
							hint: 'If set to "true", the Content-Length HTTP header will be set to an estimated value for transcoded or downsampled media',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'Transcoding not implemented yet'
						},						
						{	name: 'converted',
							hint: 'Only applicable to video streaming. Subsonic can optimize videos for streaming by converting them to MP4. If a conversion exists for the video in question, then setting this parameter to "true" will cause the converted video to be returned instead of the original',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'Transcoding not implemented yet'
						}						
					],
					return: 'binary/media'
				},
				{ 	name: 'download',
					hint: 'Downloads a given media file. Similar to stream, but this method returns the original media data without transcoding or downsampling',
					parameters: [
						{	name: 'id',
							hint: 'Unique identifier of the file to stream ( eg from getMusicDirectory() )',
							required: true,
							type: 'string'
						}
					],
					return: 'binary/media'
				},
				{ 	name: 'hls',
					hint: 'Creates an HLS (HTTP Live Streaming) playlist used for streaming video or audio. HLS is a streaming protocol implemented by Apple and works by breaking the overall stream into a sequence of small HTTP-based file downloads. It\'s supported by iOS and newer versions of Android. This method also supports adaptive bitrate streaming',
					parameters: [
						{	name: 'id',
							hint: 'A string which uniquely identifies the media file to stream',
							required: true,
							type: 'string'
						},
						{	name: 'bitRate',
							hint: 'If specified, the server will attempt to limit the bitrate to this value, in kilobits per second. If this parameter is specified more than once, the server will create a variant playlist, suitable for adaptive bitrate streaming. The playlist will support streaming at all the specified bitrates. The server will automatically choose video dimensions that are suitable for the given bitrates. A certain width and height may be specified: bitRate=1000@480x360',
							required: false,
							type: 'int',
							min: 0
						},
						{	name: 'audioTrack',
							hint: 'The ID of the audio track to use. See getVideoInfo for how to get the list of available audio tracks for a video. ',
							required: false,
							type: 'string'
						},
					],
					return: 'text/m3u8',
					compat: 'not implemented yet - needs hardware accelerated transcoding for video on low power devices (see stream)'
				},
				{ 	name: 'getCaptions',
					hint: 'Returns captions (subtitles) for a video. Use getVideoInfo to get a list of available captions',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the video',
							required: true,
							type: 'string'
						},
						{	name: 'format',
							hint: 'Preferred captions format',
							required: false,
							type: 'string',
							options: ['srt','vtt'],
							default: 'srt'
						}
					],
					return: 'text/srt',
					compat: 'not implemented yet - for local playback the jukebox does support subtitles though, see jukeboxControl?action=toggleSubs'
				},
				{ 	name: 'getCoverArt',
					hint: 'Returns a cover art image',
					parameters: [
						{	name: 'id',
							hint: 'The ID of a song, album or artist',
							required: true,
							type: 'string'
						},
						{	name: 'size',
							hint: 'If specified, scale image to this size. Single Integer - Subsonic does not preserve aspect ratio when scaling',
							required: false,
							type: 'int',
							min: 20
						}
					],
					return: 'binary/image'
				},
				{ 	name: 'getLyrics',
					hint: 'Searches for and returns lyrics for a given song',
					parameters: [
						{	name: 'artist',
							hint: 'The artist name',
							required: false,
							type: 'string'
						},
						{	name: 'title',
							hint: 'The song title',
							compat: 'not required with Subsonic but that doesn\'t make sense - no api error but return empty response for compat',
							required: true,
							type: 'string'
						}
					],
					compat: 'not implemented yet'
				},
				{ 	name: 'getAvatar',
					hint: 'Returns the avatar (personal image) for a user',
					parameters: [
						{	name: 'username',
							hint: 'the user in question',
							required: true,
							type: 'string'
						}
					],
					return: 'binary/image',
					compat: 'not implemented yet'
				}
			]
		},
		{	name: 'MediaAnnotation',
			hint: 'Add meta information to media files',
			endpoints: [
				{ 	name: 'star',
					hint: 'Attaches a star to a song, album or artist',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the file (song) or folder (album/artist) to star',
							required: false,
							type: 'int',
							multiple:true
						},
						{	name: 'albumId',
							hint: 'The ID of an album to star. Use this rather than "id" if the client accesses the media collection according to ID3 tags rather than file structure',
							required: false,
							type: 'int',
							multiple:true
						},
						{	name: 'artistId',
							hint: 'The ID of an artist to star. Use this rather than "id" if the client accesses the media collection according to ID3 tags rather than file structure',
							required: false,
							type: 'int',
							multiple:true
						}
					]
				},
				{ 	name: 'unstar',
					hint: 'Removes the star from a song, album or artist',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the file (song) or folder (album/artist) to unstar',
							required: false,
							type: 'int',
							multiple:true
						},
						{	name: 'albumId',
							hint: 'The ID of an album to unstar. Use this rather than "id" if the client accesses the media collection according to ID3 tags rather than file structure',
							required: false,
							type: 'int',
							multiple:true
						},
						{	name: 'artistId',
							hint: 'The ID of an artist to unstar. Use this rather than "id" if the client accesses the media collection according to ID3 tags rather than file structure',
							required: false,
							type: 'int',
							multiple:true
						}
					]
				},
				{ 	name: 'setRating',
					hint: 'Sets the rating for a music file',
					parameters: [
						{	name: 'id',
							hint: 'A string which uniquely identifies the file (song) or folder (album/artist) to rate',
							required: true,
							type: 'string'
						},
						{	name: 'rating',
							hint: 'The rating between 1 and 5 (inclusive), or 0 to remove the rating',
							required: true,
							type: 'int',
							min:0,
							max:5
						}
					]
				},
				{ 	name: 'scrobble',
					hint: 'Registers the local playback of one or more media files. Typically used when playing media that is cached on the client. Updates the play count and last played timestamp for the media files. ',
					parameters: [
						{	name: 'id',
							hint: 'A string which uniquely identifies the file to scrobble',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'time',
							hint: 'The timestamp at which the song was listened to',
							required: false,
							type: 'int',
							min: 0,
							compat: 'not implemented yet'
						},
						{	name: 'submission',
							hint: 'Whether this is a "submission" or a "now playing" notification',
							required: false,
							type: 'boolean',
							default: true,
							compat: 'not implemented bc "now playing" can be added to the server without needing these calls'
						}
					],
					compat: 'no last.fm integration - imho not worth implementing'
				}
			]
		},
		{	name: 'Sharing',
			hint: 'Manage direct urls/links to files and folders that can be shared to allow unrestricted download/streaming of these files',
			endpoints: [
				{ 	name: 'getShares',
					hint: 'Returns information about shared media this user is allowed to manage',
					role: 'share',
					compat: 'not implemented yet'
				},
				{ 	name: 'createShare',
					hint: 'Creates a public URL that can be used by anyone to stream music or video from the server. The URL is short and suitable for posting on social media',
					parameters: [
						{	name: 'id',
							hint: 'ID(s) of songs, albums or videos to share',
							required: true,
							type: 'int',
							multiple: true
						},
						{	name: 'description',
							hint: 'Will be displayed to people visiting the shared media',
							required: false,
							type: 'string'
						},
						{	name: 'expires',
							hint: 'Timestamp at which the share expires',
							required: false,
							type: 'int',
							min: 0
						}
					],
					role: 'share',
					compat: 'not implemented yet'
				},
				{ 	name: 'updateShare',
					hint: 'Updates the description and/or expiration date for an existing share',
					parameters: [
						{	name: 'id',
							hint: 'ID of the share to update',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'description',
							hint: 'Will be displayed to people visiting the shared media',
							required: false,
							type: 'string'
						},
						{	name: 'expires',
							hint: 'Timestamp at which the share expires',
							required: false,
							type: 'int',
							min: 0
						}
					],
					role: 'share',
					compat: 'not implemented yet'
				},
				{ 	name: 'deleteShare',
					hint: 'Deletes an existing share',
					parameters: [
						{	name: 'id',
							hint: 'ID of the share to delete',
							required: true,
							type: 'int',
							min: 0
						}
					],
					role: 'share',
					compat: 'not implemented yet'
				}
			]
		},
		{	name: 'Podcast',
			hint: 'Manage/Subcribe to Podcasts and get new episodes',
			endpoints: [
				{ 	name: 'getPodcasts',
					hint: 'Returns all Podcast channels the server subscribes to, and (optionally) their episodes. This method can also be used to return details for only one channel - refer to the id parameter. A typical use case for this method would be to first retrieve all channels without episodes, and then retrieve all episodes for the single channel the user select',
					parameters: [
						{	name: 'includeEpisodes',
							hint: 'Whether to include Podcast episodes in the returned result',
							required: false,
							type: 'boolean',
							default: true
						},
						{	name: 'id',
							hint: 'If specified, only return the Podcast channel with this ID',
							required: false,
							type: 'int',
							min: 0
						}
					],
					compat: 'not implemented yet'
				},
				{ 	name: 'getNewestPodcasts',
					hint: 'Returns the most recently published Podcast episodes',
					parameters: [
						{	name: 'count',
							hint: 'The maximum number of episodes to return',
							required: false,
							type: 'int',
							min: 1,
							default: 20
						}
					]
				},
				{ 	name: 'refreshPodcasts',
					hint: 'Requests the server to check for new Podcast episodes',
					role: 'podcast',
					compat: 'not implemented yet'
				},
				{ 	name: 'createPodcastChannel',
					hint: 'Adds a new Podcast channel',
					parameters: [
						{	name: 'url',
							hint: 'The URL of the Podcast to add',
							required: true,
							type: 'string'
						}
					],
					role: 'podcast',
					compat: 'not implemented yet'
				},
				{ 	name: 'deletePodcastChannel',
					hint: 'Deletes a Podcast channel',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the Podcast channel to delete',
							required: true,
							type: 'int',
							min: 0
						}
					],
					role: 'podcast',
					compat: 'not implemented yet'
				},
				{ 	name: 'deletePodcastEpisode',
					hint: 'Deletes a Podcast episode',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the Podcast episode to delete',
							required: true,
							type: 'int',
							min: 0
						}
					],
					role: 'podcast',
					compat: 'not implemented yet'
				},
				{ 	name: 'downloadPodcastEpisode',
					hint: 'Request the server to start downloading a given Podcast episode',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the Podcast episode to download',
							required: true,
							type: 'int',
							min: 0
						}
					],
					role: 'podcast',
					compat: 'not implemented yet'
				},
			]
		},
		{	name: 'Jukebox',
			hint: 'Jukebox interface for server-side playback',
			endpoints: [
				{ 	name: 'jukeboxControl',
					hint: 'Controls the jukebox, i.e. playback directly on the server\'s audio hardware',
					parameters: [
						{	name: 'action',
							hint: 'The operation to perform',
							required: true,
							type: 'string',
							options: ['get', 'status', 'set', 'start', 'stop', 'skip', 'add', 'clear', 'remove', 'shuffle', 'setGain', 'toggleSubs', 'toggleLang', 'toggleVideoOut', 'toggleVisualizer']
						},
						{	name: 'index',
							hint: 'Used by skip and remove. Zero-based index of the song to skip to or remove',
							required: false,
							type: 'int',
							min: 0,
							compat: 'Required if action is skip or remove'
						},
						{	name: 'offset',
							hint: 'Used by skip. Start playing this many seconds into the track',
							required: false,
							type: 'int',
							min: 0
						},
						{	name: 'id',
							hint: 'Used by add and set. ID of song to add to the jukebox playlist. Use multiple id parameters to add many songs in the same request. (set is similar to a clear followed by a add, but will not change the currently playing track)',
							required: false,
							type: 'int',
							multiple: true
						},
						{	name: 'gain',
							hint: 'Used by setGain to control the playback volume (1.0 equals 100%)',
							required: false,
							type: 'float',
							min: 0.0,
							max: 1.0,
							compat: 'Required if action is setGain'
						},
						{	name: 'enabled',
							hint: 'Optional param for toggleVideoOut and toggleVisualizer, that sets the new state instead of toggling',
							required: false,
							type: 'boolean',
							compat: 'API extension'
						}
					],
					role: 'jukebox'
				},
			]
		},
		{	name: 'InternetRadio',
			hint: 'Create/curate a list of internet radio stations for the server',
			endpoints: [
				{ 	name: 'getInternetRadioStations',
					hint: 'Returns all internet radio stations',
					compat: 'not implemented yet'
				},
				{ 	name: 'createInternetRadioStation',
					hint: 'Adds a new internet radio station',
					parameters: [
						{	name: 'streamUrl',
							hint: 'The stream URL for the station',
							required: true,
							type: 'string'
						},
						{	name: 'name',
							hint: ' The user-defined name for the station',
							required: true,
							type: 'string'
						},
						{	name: 'homepageUrl',
							hint: 'The home page URL for the station',
							required: false,
							type: 'string'
						}
					],
					role: 'admin',
					compat: 'not implemented yet'
				},
				{ 	name: 'updateInternetRadioStation',
					hint: 'Updates an existing internet radio station',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the station to update',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'streamUrl',
							hint: 'The stream URL for the station',
							required: true,
							type: 'string'
						},
						{	name: 'name',
							hint: ' The user-defined name for the station',
							required: true,
							type: 'string'
						},
						{	name: 'homepageUrl',
							hint: 'The home page URL for the station',
							required: false,
							type: 'string'
						}
					],
					role: 'admin',
					compat: 'not implemented yet'
				},
				{ 	name: 'deleteInternetRadioStation',
					hint: 'Deletes an existing internet radio station',
					parameters: [
						{	name: 'id',
							hint: 'The ID of the station to delete',
							required: true,
							type: 'int',
							min: 0
						}
					],
					role: 'admin',
					compat: 'not implemented yet'
				}
			]
		},
		{	name: 'Chat',
			hint: 'One simple chat log on the server for messages between users',
			endpoints: [
				{ 	name: 'getChatMessages',
					hint: 'Returns the current visible (non-expired) chat messages',
					parameters: [
						{	name: 'since',
							hint: 'Only return messages newer than this timestamp',
							required: false,
							type: 'int',
							min: 0
						}
					],
					compat: 'not implemented yet'
				},
				{ 	name: 'addChatMessage',
					hint: 'Adds a message to the chat log',
					parameters: [
						{	name: 'message',
							hint: 'The chat message',
							required: true,
							type: 'string'
						}
					],
					compat: 'not implemented yet'
				}
			]
		},
		{	name: 'UserManagement',
			hint: 'Create/update/delete user on server',
			endpoints: [
				{ 	name: 'getUser',
					hint: ' Get details about a given user, including which authorization roles and folder access it has. Can be used to enable/disable certain features in the client, such as jukebox control',
					parameters: [
						{	name: 'username',
							hint: 'The name of the user to retrieve. You can only retrieve your own user unless you have admin privileges',
							required: true,
							type: 'string'
						}
					]
				},
				{ 	name: 'getUsers',
					hint: 'Get details about all users, including which authorization roles and folder access they have',
					role: 'admin'
				},
				{ 	name: 'createUser',
					hint: 'Creates a new Subsonic user',
					parameters: [
						{	name: 'username',
							hint: 'The name of the new user',
							required: true,
							type: 'string'
						},
						{	name: 'password',
							hint: 'The password of the new user, either in clear text of hex-encoded (prefixed with "enc:")',
							required: true,
							type: 'string'
						},
						{	name: 'email',
							hint: 'The email address of the new user',
							required: true,
							type: 'string'
						},
						{	name: 'ldapAuthenticated',
							hint: 'Whether the user is authenicated in LDAP',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but LDAP is not implemented'
						},
						{	name: 'adminRole',
							hint: 'Whether the user is administrator',
							required: false,
							type: 'boolean',
							default: false
						},
						{	name: 'settingsRole',
							hint: 'Whether the user is allowed to change personal settings and password',
							required: false,
							type: 'boolean',
							default: true,
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'streamRole',
							hint: 'Whether the user is allowed to play files',
							required: false,
							type: 'boolean',
							default: true,
							compat: 'can be stored, but not implemented - every user is allowed to stream'
						},
						{	name: 'jukeboxRole',
							hint: 'Whether the user is allowed to play files in jukebox mode',
							required: false,
							type: 'boolean',
							default: false
						},
						{	name: 'downloadRole',
							hint: 'Whether the user is allowed to download files',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented - every user is allowed to download files'
						},
						{	name: 'uploadRole',
							hint: 'Whether the user is allowed to upload files',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented - no upload via api anyways'
						},
						{	name: 'playlistRole',
							hint: 'Whether the user is allowed to create and delete playlists',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented - deprecated in Subsonic anyways'
						},
						{	name: 'coverArtRole',
							hint: 'Whether the user is allowed to change cover art and tags',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented - metadata manipulation via api not in scope'
						},
						{	name: 'commentRole',
							hint: 'Whether the user is allowed to create and edit comments and ratings',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented - not very useful'
						},
						{	name: 'podcastRole',
							hint: 'Whether the user is allowed to administrate Podcasts',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'shareRole',
							hint: 'Whether the user is allowed to share files with anyone',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'videoConversionRole',
							hint: 'Whether the user is allowed to start video conversions',
							required: false,
							type: 'boolean',
							default: false,
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'musicFolderId',
							hint: 'IDs of the music folders the user is allowed access to',
							required: false,
							type: 'int',
							multiple: true,
							default: '*',
							compat: 'not implemented yet'
						}
					],
					role: 'admin'
				},
				{ 	name: 'updateUser',
					hint: 'Modifies an existing Subsonic user',
					parameters: [
						{	name: 'username',
							hint: 'The name of the user to update. You can only update your own data user unless you have admin privileges',
							required: true,
							type: 'string'
						},
						{	name: 'password',
							hint: 'The new password of the user, either in clear text of hex-encoded (prefixed with "enc:")',
							required: false,
							type: 'string'
						},
						{	name: 'email',
							hint: 'The updated email address of the user',
							required: false,
							type: 'string'
						},
						{	name: 'ldapAuthenticated',
							hint: 'Whether the user is authenicated in LDAP',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but LDAP is not implemented'
						},
						{	name: 'adminRole',
							hint: 'Whether the user is administrator',
							required: false,
							type: 'boolean'
						},
						{	name: 'settingsRole',
							hint: 'Whether the user is allowed to change personal settings and password',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'streamRole',
							hint: 'Whether the user is allowed to play files',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented - every user is allowed to stream'
						},
						{	name: 'jukeboxRole',
							hint: 'Whether the user is allowed to play files in jukebox mode',
							required: false,
							type: 'boolean'
						},
						{	name: 'downloadRole',
							hint: 'Whether the user is allowed to download files',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented - every user is allowed to download files'
						},
						{	name: 'uploadRole',
							hint: 'Whether the user is allowed to upload files',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented - no upload via api anyways'
						},
						{	name: 'playlistRole',
							hint: 'Whether the user is allowed to create and delete playlists',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented - deprecated in Subsonic anyways'
						},
						{	name: 'coverArtRole',
							hint: 'Whether the user is allowed to change cover art and tags',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented - metadata manipulation via api not in scope'
						},
						{	name: 'commentRole',
							hint: 'Whether the user is allowed to create and edit comments and ratings',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented - not very useful'
						},
						{	name: 'podcastRole',
							hint: 'Whether the user is allowed to administrate Podcasts',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'shareRole',
							hint: 'Whether the user is allowed to share files with anyone',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'videoConversionRole',
							hint: 'Whether the user is allowed to start video conversions',
							required: false,
							type: 'boolean',
							compat: 'can be stored, but not implemented yet'
						},
						{	name: 'musicFolderId',
							hint: 'IDs of the music folders the user is allowed access to',
							required: false,
							type: 'int',
							multiple: true,
							compat: 'not implemented yet'
						},
						{	name: 'maxBitRate',
							hint: 'The maximum bit rate (in Kbps) for the user. Audio streams of higher bit rates are automatically downsampled to this bit rate. use 0 for no limit',
							required: false,
							type: 'int',
							options: [0,32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
							compat: 'not implemented yet'
						}
					]
				},
				{ 	name: 'deleteUser',
					hint: 'Deletes an existing Subsonic user',
					parameters: [
						{	name: 'username',
							hint: 'The name of the user to delete. You can only delete your own user unless you have admin privileges',
							required: true,
							type: 'string'
						}
					]
				},
				{ 	name: 'changePassword',
					hint: 'Changes the password of an existing Subsonic user',
					parameters: [
						{	name: 'username',
							hint: 'change password of this user. You can only change your own password unless you have admin privileges',
							required: true,
							type: 'string'
						},
						{	name: 'password',
							hint: 'The new password of the user, either in clear text of hex-encoded (prefixed with "enc:")',
							required: true,
							type: 'string'
						}
					]
				}
			]
		},
		{	name: 'Bookmarks',
			hint: 'Save/restore bookmarks and play queues',
			endpoints: [
				{ 	name: 'getBookmarks',
					hint: 'Returns all bookmarks for this user. A bookmark is a position within a certain media file',
					compat: 'not implemented yet'
				},
				{ 	name: 'createBookmark',
					hint: 'Creates or updates a bookmark (a position within a media file). Bookmarks are personal and not visible to other users',
					parameters: [
						{	name: 'id',
							hint: 'ID of the media file to bookmark. If a bookmark already exists for this file it will be overwritten',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'position',
							hint: 'The position (in milliseconds) within the media file',
							required: true,
							type: 'int',
							min: 0
						},
						{	name: 'comment',
							hint: 'A user-defined comment',
							required: false,
							type: 'string'
						}
					],
					compat: 'not implemented yet'
				},
				{ 	name: 'deleteBookmark',
					hint: 'Deletes the bookmark for a given file',
					parameters: [
						{	name: 'id',
							hint: 'ID of the media file for which to delete the bookmark. Other users\' bookmarks are not affected',
							required: true,
							type: 'int',
							min: 0
						}
					],
					compat: 'not implemented yet'
				},
				{ 	name: 'getPlayQueue',
					hint: 'Returns the state of the play queue for this user (as set by savePlayQueue)',
					compat: 'not implemented yet'
				},
				{ 	name: 'savePlayQueue',
					hint: 'Saves the state of the play queue for this user. This includes the tracks in the play queue, the currently playing track, and the position within this track. Can be used to allow a user to move between different clients/apps while retaining the same play queue',
					parameters: [
						{	name: 'id',
							hint: 'ID(s) of songs in the play queue. List order is play queue order',
							required: true,
							type: 'int',
							multiple: true
						},
						{	name: 'current',
							hint: 'The ID of the current playing song',
							required: false,
							type: 'int',
							min: 0,
							compat: 'Fails as soon as there are multiple occurences of the same song in the playqueue (see general notes about the Subsonic api)'
						},
						{	name: 'position',
							hint: 'The position in milliseconds within the currently playing song',
							required: false,
							type: 'int',
							min: 0
						}
					],
					compat: 'not implemented yet'
				}
			]
		}
	]		
}

export default apiJSON
