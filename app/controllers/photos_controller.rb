class PhotosController < ApplicationController
  def upload
    photo_attrs = params[:photo].permit(:image, :latitude, :longitude)
    photo = current_user.photos.build(photo_attrs)
    respond_to do |format|
      if photo.save
        format.html { redirect_to root_url, notice: 'Photo was successfully created.' }
      else
        format.html { redirect_to root_url, notice: 'Error!' }
      end
    end
  end
end
