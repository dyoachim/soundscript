class VideosController < ApplicationController
  
  def show
    @video = Search.video_by_id(params[:id])
  end

end