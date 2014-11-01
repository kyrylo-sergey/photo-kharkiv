class Photo < ActiveRecord::Base
  belongs_to :user
  mount_uploader :image, PhotoUploader

  validates :latitude, :longitude, :image, presence: true
  validates :latitude, numericality: {
              greater_than_or_equal_to: -90,
              less_than_or_equal_to: 90 }
  validates :longitude, numericality: {
              greater_than_or_equal_to: -180,
              less_than_or_equal_to: 180 }
end
