require 'rails_helper'

describe User do
  describe 'create' do
    it 'creates a valid user' do
      expect{User.create!(username: "Y", email: 'dan@dan.com', password: 'password')}.to change{User.all.count}.by 1
    end

    it 'does not take invalid email' do
      expect{User.create!(username: "Y", email: 'aaa', password: 'password')}.to raise_error
    end

    # it 'does not take invalid last name' do
    #   expect{User.create!(first_name: "Dan", last_name: "", email: 'dan@dan.com', password: 'password')}.to raise_error
    # end
  end
end