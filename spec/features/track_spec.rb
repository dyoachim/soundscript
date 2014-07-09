# WHY IS THIS COMMENTED OUT??  If you aren't going to end up using this, delete it.

# require 'rails_helper'

# feature 'User browsing the website' do

#   it 'adds a track', js: true do
#     @user = User.create!(username: "test", email: 'test@dan.com', password: "password")
#     session = Capybara::Session.new(:chrome)
#     session.visit('http://localhost:3000/sessions/new')
#     session.fill_in('session[email]', :with => @user.email)
#     session.fill_in('session[password]', :with => 'password')
#     session.click_button 'Sign In'
#     session.visit "http://localhost:3000/videos/Yt1vu0Izc68"
#     session.click_button 'Add Track'
#     expect(page.has_css?('.tracks_box')).to be true
#     expect(false).to eq true
#   end


#   it 'submits a track', js: true do
#     @user = User.create!(username: "Dan", email: 'dan@dan.com', password: "password")
#     visit new_session_path
#     fill_in 'session[email]', with: @user.email
#     fill_in 'session[password]', with: "password"
#     click_button 'Sign In'
#     visit "/videos/Yt1vu0Izc68"
#     click_button 'Add Track'
#     page.find('.tracks_box').double_click
#     page.find('.post-it')
#     click_button 'Submit'

#     expect(false).to eq true
#   end

#   it 'displays a videos tracks', js: true do
#     @user = User.create(username: "Dan", email: 'dan@dan.com', password: "password")
#     @track = Track.create(user_id: @user.id, youtube_id: "Yt1vu0Izc68", primary_language: "English", transcript: "{\"0\"=>{\"content\"=>\"Track content\", \"position_css\"=>\"top: 81px; left: 346px; width: 476px; height: 106px;\"}}")
#     visit "/videos/Yt1vu0Izc68"
#     wait_until{ page.has_content?('Track content')}
#     expect(page).to have_content "Track content"
#   end
# end