class PhotosController < ApplicationController
  def upload
    photo_attrs = params[:photo].permit(:image)
    photo = current_user.photos.build(photo_attrs)
    photo.save!
    redirect_to root_url
  end
end
