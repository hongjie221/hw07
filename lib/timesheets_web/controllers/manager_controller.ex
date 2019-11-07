defmodule TimesheetsWeb.ManagerController do
  use TimesheetsWeb, :controller

  alias Timesheets.Managers
  alias Timesheets.Managers.Manager

  action_fallback TimesheetsWeb.FallbackController

  def index(conn, _params) do
    managers = Managers.list_managers()
    render(conn, "index.json", managers: managers)
  end

  def create(conn, %{"manager" => manager_params}) do
    with {:ok, %Manager{} = manager} <- Managers.create_manager(manager_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.manager_path(conn, :show, manager))
      |> render("show.json", manager: manager)
    end
  end

  def show(conn, %{"id" => id}) do
    manager = Managers.get_manager!(id)
    render(conn, "show.json", manager: manager)
  end

  def update(conn, %{"id" => id, "manager" => manager_params}) do
    manager = Managers.get_manager!(id)

    with {:ok, %Manager{} = manager} <- Managers.update_manager(manager, manager_params) do
      render(conn, "show.json", manager: manager)
    end
  end

  def delete(conn, %{"id" => id}) do
    manager = Managers.get_manager!(id)

    with {:ok, %Manager{}} <- Managers.delete_manager(manager) do
      send_resp(conn, :no_content, "")
    end
  end
end
