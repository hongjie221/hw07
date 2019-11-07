defmodule TimesheetsWeb.WorkerController do
  use TimesheetsWeb, :controller

  alias Timesheets.Workers
  alias Timesheets.Workers.Worker

  action_fallback TimesheetsWeb.FallbackController

  def index(conn, _params) do
    workers = Workers.list_workers()
    render(conn, "index.json", workers: workers)
  end

  def create(conn, %{"worker" => worker_params}) do
    with {:ok, %Worker{} = worker} <- Workers.create_worker(worker_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.worker_path(conn, :show, worker))
      |> render("show.json", worker: worker)
    end
  end

  def show(conn, %{"id" => id}) do
    worker = Workers.get_worker!(id)
    render(conn, "show.json", worker: worker)
  end

  def update(conn, %{"id" => id, "worker" => worker_params}) do
    worker = Workers.get_worker!(id)

    with {:ok, %Worker{} = worker} <- Workers.update_worker(worker, worker_params) do
      render(conn, "show.json", worker: worker)
    end
  end

  def delete(conn, %{"id" => id}) do
    worker = Workers.get_worker!(id)

    with {:ok, %Worker{}} <- Workers.delete_worker(worker) do
      send_resp(conn, :no_content, "")
    end
  end
end
