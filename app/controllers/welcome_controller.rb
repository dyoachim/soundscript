class WelcomeController < ApplicationController

  def index
  	@videos = Search.main(params[:search_term])
  end
end