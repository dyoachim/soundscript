require 'rails_helper'

describe User do
  let(:user) { User.create!(username: "Name", email: 'name@name.com', password: 'password') }

    it "create a User" do
      expect{User.create!(username: "Y", email: 'dan@dan.com', password: 'password')}.to change{User.all.count}.by 1
    end

    it "does not create user without an username" do
      expect{User.create!(username: "", email: 'dan@dan.com', password: 'password')}.to raise_error
    end

    it "does not create user without a password" do
      expect{User.create!(username: "Name", email: 'dan@dan.com', password: '')}.to raise_error
    end

    it 'does not create an user without a valid email' do
      expect{User.create!(username: "Y", email: 'aaa', password: 'password')}.to raise_error
    end


    # remove commented out code

    # it 'does not take invalid last name' do
    #   expect{User.create!(first_name: "Dan", last_name: "", email: 'dan@dan.com', password: 'password')}.to raise_error
    # end
end