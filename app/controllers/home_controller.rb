class HomeController < ApplicationController
  def index
    if current_user
      @photo = Photo.new
    end
  end
end
