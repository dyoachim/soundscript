class TracksController < ApplicationController

  def create
    language = Language.find_by_title(params[:languagename])
    track = Track.new(youtube_id: params[:video_id], user_id: session[:user_id])
    track.transcript = params[:data].to_json
    track.language_id = language.id
    
    track.save
  	redirect_to '/'
  end

  def destroy
  	@track = Track.find(params[:id])
  	@track.destroy
    redirect_to root_path
  end

  def update
    Track.find(params[:id]).update_attributes(language_id: params[:languagename], transcript: params[:data].to_json)
    redirect_to '/'
  end

end
