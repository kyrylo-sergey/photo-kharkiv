class PhotosController < ApplicationController
  def upload
    photo = current_user.photos.build(params[:photo].permit(:image))

    respond_to do |format|
      if photo.save
        format.html { redirect_to root_url, notice: 'Product was successfully created.' }
      else
        format.html { redirect_to root_url, notice: 'Error!' }
      end
    end
  end
end
