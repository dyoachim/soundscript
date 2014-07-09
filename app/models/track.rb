class Track < ActiveRecord::Base
	belongs_to :user
	belongs_to :language


	def upVote
	  vote = self.vote_count += 1
	  self.save
	end

	def downVote 
	  vote = self.vote_count -= 1
	  self.save
	end
end
