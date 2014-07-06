class TracksController < ApplicationController

  def create
    track = Track.new
    params[:data].each do |key, val|
      track.sentences << Sentence.create(val)
    end
    track.save
  redirect_to '/'
  end
end
