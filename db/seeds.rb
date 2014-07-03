User.create(username:"monica", oauth_token: "skjvdadkjn",oauth_secret: 'sdvkdjnsflkv')

User.find(1).tracks << Track.create(youtube_url:"www.youtube.com")

User.find(1).tracks.first.sentences << Sentence.create(content: "coooolsong lalalala", injection_time: 43)