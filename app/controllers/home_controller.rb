class HomeController < ApplicationController
  def index
    if current_user
      @photo = Photo.new
    end

    @markers = Photo.all.to_json
  end
end
