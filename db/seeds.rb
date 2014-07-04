User.create(username:"monica", password: "password", email: 'monica@yahoo.com')

User.find(1).tracks << Track.create(youtube_url:"www.youtube.com")

User.find(1).tracks.first.sentences << Sentence.create(content: "coooolsong lalalala", injection_time: 43)