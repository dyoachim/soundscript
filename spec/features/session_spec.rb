require 'rails_helper'

describe SessionsController do

  it 'logs in the user' do
    @user = User.create!(username: "Name", email: 'name@name.com', password: 'password')
    visit root_path
    fill_in 'session[email]', with: @user.email
    fill_in 'session[password]', with: "password"
    click_on 'Sign In'
    expect(current_path).to eq(root_path)
    expect(page).to have_content("Profile")
  end

    it 'does not log in the user with invalid credentials' do
    @user = User.create!(username: "Name", email: 'name@name.com', password: 'password')
    visit root_path
    fill_in 'session[email]', with: @user.email
    fill_in 'session[password]', with: "pwd"
    click_on 'Sign In'
    expect(current_path).to eq(root_path)
    expect(page).to_not have_content("Profile")
  end

  it 'logs out the user' do
    @user = User.create!(username: "Name", email: 'name@name.com', password: 'password')
    visit root_path
    fill_in 'session[email]', with: @user.email
    fill_in 'session[password]', with: "password"
    click_on 'Sign In'
    expect(current_path).to eq(root_path)
    expect(page).to have_content("Profile")
    click_on 'Logout'
    expect(current_path).to eq(root_path)
    expect(page).to_not have_content("Profile")
  end
end