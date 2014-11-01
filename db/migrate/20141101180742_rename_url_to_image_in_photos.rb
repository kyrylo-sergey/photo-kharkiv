class RenameUrlToImageInPhotos < ActiveRecord::Migration
  def change
    rename_column :photos, :url, :image
  end
end
