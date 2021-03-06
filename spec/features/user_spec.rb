require 'rails_helper'

feature 'User browsing the website' do

  it "creates new user" do
    visit new_user_url
    fill_in 'user[username]',   with: "Dan"
    fill_in 'user[email]', with: "dan@dan.com"
    fill_in 'user[password]', with: "password"
    fill_in 'user[password_confirmation]', with: "password"
    click_button 'Create Me!'
    expect(User.all.last.username).to eq 'Dan'
  end

  it "does not create new user with invalid credentials" do
    visit new_user_url
    fill_in 'user[username]',   with: "Dan"
    fill_in 'user[email]', with: "dan@dan.com"
    fill_in 'user[password]', with: "password"
    fill_in 'user[password_confirmation]', with: "pwd"
    click_button 'Create Me!'
    expect(page).to have_button("Create Me!")
  end

  it 'edits user fields' do
    @user = User.create(username: "Dan", email: 'dan@dan.com', password: "password")
    visit new_session_path
    fill_in 'session[email]', with: @user.email
    fill_in 'session[password]', with: "password"
    click_on 'Sign In'
    visit edit_user_path(@user)
    fill_in 'user[email]', with: "new@email.com"
    click_button 'Update!'
    expect(User.find(@user.id).email).to eq 'new@email.com'
  end

  it 'redirects from edit if logged out' do
    @user = User.create(username: "Dan", email: 'dan@dan.com', password: "password")
    visit edit_user_path(@user)
    expect(current_path).to eq root_path
  end

  it 'deletes user' do
    @user = User.create(username: "Dan", email: 'dan@dan.com', password: "password")
    visit new_session_path
    fill_in 'session[email]', with: @user.email
    fill_in 'session[password]', with: "password"
    click_on 'Sign In'
    visit edit_user_path(@user)
    click_button 'Delete'
    expect(User.all.count).to eq(0)
  end
end