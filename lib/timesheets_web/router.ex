defmodule TimesheetsWeb.Router do
  use TimesheetsWeb, :router

  pipeline :browser do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/ajax", TimesheetsWeb do
    pipe_through :ajax
    resources "/sessions", SessionController, only: [:create], singleton: true

    resources "/workers", WorkerController, except: [:new, :edit]
    resources "/sheets", SheetController
    resources "/jobs", JobController
    get "/sheets/approve/:manager_id/:id", SheetController, :approve
  end

  scope "/", TimesheetsWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TimesheetsWeb do
  #   pipe_through :api
  # end
end
