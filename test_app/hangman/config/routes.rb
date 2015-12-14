Rails.application.routes.draw do
  root :to => 'home#index'
  resource :game, :only => [:new, :show, :update, :destroy]

end

#     root GET    /                   home#index
# new_game GET    /game/new(.:format) games#new
#     game GET    /game(.:format)     games#show
#          PATCH  /game(.:format)     games#update
#          PUT    /game(.:format)     games#update
#          DELETE /game(.:format)     games#destroy