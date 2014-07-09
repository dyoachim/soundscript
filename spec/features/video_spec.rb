require 'rails_helper'

feature 'Non user on the video show page' do

  it "user lands on video page" do
  	visit "/videos/Q98_N2TQwKA"
    expect(page).to_not have_button("Add Track")
  end

  it "user lands on video page" do
  	visit "/videos/Q98_N2TQwKA"
    expect(page).to have_content("pause")
  end

  # it "plays the video" do
  # 	click_link('#play')
  # 	expect()
  # end

end
