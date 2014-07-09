class TracksController < ApplicationController

  def create
    @languages = Language.all
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

    if params[:vote]
      if params[:vote].include?('up')
	track = Track.find(params[:id])
	track.upVote
      elsif params[:vote].include?('down')
	track = Track.find(params[:id])
	track.downVote
      end
    end

    if params[:languagename]
      language_id = Language.find_by_title(params[:languagename]).id
      Track.find(params[:id]).update_attributes(language_id: language_id, transcript: params[:data].to_json)
    end
    redirect_to '/'

  end
end
