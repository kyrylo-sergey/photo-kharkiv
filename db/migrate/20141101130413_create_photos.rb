class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :user, index: true
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
