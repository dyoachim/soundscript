class UsersController < ApplicationController
include SessionsHelper
	def new
		@languages = Language.all
		@user = User.new
	end

	def create
		@languages = Language.all
		@user = User.new(user_params)
		if @user.save
			session[:user_id] = @user.id
			redirect_to root_path
		else
			render 'new'
		end
	end

	def edit
		@languages = Language.all
		if current_user == User.find(params[:id])
			@user = current_user
			render 'edit'
		else
			redirect_to root_path
		end

	end

	def show
		@languages = Language.all
		if current_user == User.find(params[:id])
			@user = current_user
			render 'show'
		else
			redirect_to root_path
		end
	end

	def update
		if current_user == User.find(params[:id])
			current_user.update(user_params)
			redirect_to user_path(current_user)
		else
			redirect_to root_path
		end
	end

	def destroy

		User.find(params[:id]).destroy
		session.clear
		redirect_to root_path
	end

	private
	def user_params
		params.require(:user).permit(:username, :email, :password, :password_confirmation)
	end

end