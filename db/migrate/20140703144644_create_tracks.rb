class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :user_id
      t.string :youtube_url
      t.string :primary_language

      t.timestamps
    end
  end
end
