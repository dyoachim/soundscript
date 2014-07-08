User.create(username:"monica", password: "password", email: 'monica@yahoo.com')

languages = ["Albanian","Bulgarian","Chinese", "Czech", "Danish", "English","French","German", "Irish", "Italian","Japanese", "Korean","Polish", "Russian","Serbian","Spanish","Swedish", "Turkish" ,"Ukrainian"]


languages.each do |lang|
	Language.create(title: lang)
end