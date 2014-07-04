class WelcomeController < ApplicationController

  def index
  	Search.get_service
  	@videos = Search.main(params[:search_term])
  end
end