require 'faker'

User.create(username:"monica", password: "password", email: 'monica@yahoo.com')

User.find(1).tracks << Track.create(youtube_url:"www.youtube.com")

User.find(1).tracks.first.sentences << Sentence.create(content: "coooolsong lalalala", injection_time: 43)


languages = ["Spanish", "English", "Portuguese", "Japanese", "Korean", "Danish", "Armenian", "German","Norwegian", "Romanian", "Russian", "Vietnamese", "Bulgarian", "Serbian", "Estonian", "Hungarian", "Laotian", "Lithuanian", "Swedish", "Scots", "Welsh", "Chinese", "Czech", "Croatian", "Finnish", "French", "Icelandic", "Indonesian", "Italian", "Macedonian", "Malay", "Polish", "Maltese", "Turkish", "Thai"]


13.times {User.create(username: 'Faker::Internet.user_name', password: "password", email: 'Faker::Internet.email')}


languages.each do |lang|
	Language.create(type: lang, user_id: rand(14)+ 1)
end