class SessionsController < ApplicationController

	def new
		@languages = Language.all
	end


	def create
		@languages = Language.all
		@user = User.find_by_email(params[:session][:email])
		if @user && @user.authenticate(params[:session][:password])
			@error = "Logged in Successfully"
			session[:user_id] = @user.id
			redirect_to root_path
		else
			@error = "Your email and password do not match."
			redirect_to new_session_path
		end
	end

	def destroy
		session[:user_id] = nil
		redirect_to root_path
	end

end