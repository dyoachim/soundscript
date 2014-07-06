class CreateSentences < ActiveRecord::Migration
  def change
    create_table :sentences do |t|
      t.text :content
      t.integer :track_id
      t.string :injection_time

      t.timestamps
    end
  end
end
