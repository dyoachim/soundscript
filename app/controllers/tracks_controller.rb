class TracksController < ApplicationController

  def create
    track = Track.new(youtube_id: params[:video_id], user_id: session[:user_id])
    track.transcript = params[:data].to_json
    track.save
  	redirect_to '/'
  end

  def destroy
  	@track = Track.find(params[:id])
  	@track.destroy
    redirect_to root_path
  end

  def edit
		@track = Track.find(params[:id])

    if @track
      render :edit
    else
      redirect_to root_path
    end
	end

end
