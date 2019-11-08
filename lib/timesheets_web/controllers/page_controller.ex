defmodule TimesheetsWeb.PageController do
  use TimesheetsWeb, :controller

  def index(conn, _params) do

    IO.inspect("page index")
    render(conn, "index.html")
  end
end
