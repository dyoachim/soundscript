class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :user_id
      t.string :youtube_id
      t.integer :language_id
      t.text :transcript
      t.integer :vote_count, default: 0 
      t.timestamps
    end
  end
end
