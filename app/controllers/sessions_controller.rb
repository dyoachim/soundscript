class SessionsController < ApplicationController

	def new
	end


	def create
		@user = User.find_by_email(params[:session][:email])
		if @user && @user.authenticate(params[:session][:password])
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