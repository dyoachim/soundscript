class User < ActiveRecord::Base
	has_many :tracks, dependent: :destroy
	validates :username, presence: true
	validates :email, presence: true, uniqueness: true, format: {with: /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\Z/i}
	validates :password_digest, presence: true

	has_secure_password


end
