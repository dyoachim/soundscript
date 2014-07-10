class LanguagesController < ApplicationController

 def show
	 	@languages = Language.all
    @language = Language.find_by_title(params[:language])
    @tracks = Track.where(language_id: @language.id)
  end
end