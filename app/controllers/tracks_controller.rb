class TracksController < ApplicationController

  def create
    track = Track.new(youtube_id: params[:video_id], user_id: session[:user_id])
    track.transcript = params[:data].to_s
    track.save
  	redirect_to '/'
  end


  def destroy
  	@track = Track.find(params[:id])
  	@track.destroy
    redirect_to root_path
  end
end
