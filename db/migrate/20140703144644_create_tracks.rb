class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.integer :user_id
      t.string :youtube_id
      t.integer :language_id
      t.text :transcript

      t.timestamps
    end
  end
end
