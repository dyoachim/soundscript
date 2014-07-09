class WelcomeController < ApplicationController
	require 'will_paginate/array'
  def index
  	@languages = Language.all
  	@videos = Search.main(params[:search_term]).paginate(:page => params[:page], :per_page => 16)
  end
end	