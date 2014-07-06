class VideosController < ApplicationController
  
  def show
    @video = Search.video_by_id(params[:id]).first
    @tracks = Track.where('youtube_id=?', @video.id)
  end

end
