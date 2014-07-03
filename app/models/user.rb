class User < ActiveRecord::Base
	has_many :languages
	has_many :tracks
	has_many :sentences, through: :tracks
end
