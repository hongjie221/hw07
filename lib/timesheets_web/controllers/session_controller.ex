defmodule TimesheetsWeb.SessionController do
  use TimesheetsWeb, :controller

  action_fallback TimesheetsWeb.FallbackController
  alias Timesheets.Managers
  alias Timesheets.Workers

  def create(conn, %{"manager_email" => manager_email, "manager_password" => password}) do
    IO.inspect("session create");
    manager = Managers.authenticate_manager(manager_email, password)

    if manager do
      token = Phoenix.Token.sign(conn, "session", manager.id)
      resp = %{token: token, manager_id: manager.id, manager_name: manager.name}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))

    else
      resp = %{errors: ["Authentication Failed"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    end
  end

  def create(conn, %{"worker_email" => worker_email, "worker_password" => worker_password}) do
    IO.inspect(" worker session create");
    worker = Workers.authenticate(worker_email, worker_password)

    if worker do
      token = Phoenix.Token.sign(conn, "session", worker.id)
      resp = %{token: token, worker_id: worker.id, worker_name: worker.name}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))

    else
      resp = %{errors: ["Authentication Failed"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    end
  end

end
