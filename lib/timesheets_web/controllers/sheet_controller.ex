defmodule TimesheetsWeb.SheetController do
  use TimesheetsWeb, :controller

  alias Timesheets.Sheets
  alias Timesheets.Sheets.Sheet

  action_fallback TimesheetsWeb.FallbackController

  def index(conn, _params) do
    sheets = Sheets.list_sheets()
    render(conn, "index.json", sheets: sheets)
  end

  def create(conn, %{"job_code" => job_code,"current_worker_id" => current_worker_id,
   "hour" => hour, "description" => description, "date" => date}) do
    IO.inspect(hour)

    integer_hour =
      Enum.map(hour, fn x ->
        {
          if String.length(x) === 0 do
            0
          else
            case Integer.parse(x) do
              :error ->
                100

              {a, _} ->
                if a < 0 do
                  100
                else
                  a
                end
            end
          end
        }
      end)

    integer_hour = Enum.map(integer_hour, fn {x} -> x end)
    {_, total} = Enum.map_reduce(integer_hour, 0, fn x, acc -> {x, x + acc} end)
    combo = Enum.zip(integer_hour, job_code)
    combo_with_note = Enum.zip(combo, description)
    Enum.map(combo_with_note, fn {{x, y}, z} -> {
      IO.inspect(x)
    }end)
    {:ok, date} = (Date.from_iso8601(date))
    if total === 8 do
      case Timesheets.Sheets.create_sheet(%{
        date: date,
        worker_id: current_worker_id,
        status: false,

      }) do
        {:ok, sheet} -> Enum.map(combo_with_note, fn {{x, y}, z} -> {
          if x !== 0 do
            Timesheets.Tasks.create_task(%{
                 hours: x,
                 job_id: Timesheets.Jobs.get_job_id_by_code(y),
                 sheet_id: sheet.id,
                 note: z,
            })
          end}
        end)
        render(conn, "show.json", current_worker_id: current_worker_id)
        {:error, msg} -> resp = %{errors: msg}
        IO.inspect(msg)

      end

    else

    end
  end

  def show(conn, %{"id" => id}) do
    #sheet = Sheets.get_sheet!(id)
    render(conn, "show.json", id: id)
  end

  def update(conn, %{"id" => id, "sheet" => sheet_params}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{} = sheet} <- Sheets.update_sheet(sheet, sheet_params) do
      render(conn, "show.json", sheet: sheet)
    end
  end

  def delete(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)

    with {:ok, %Sheet{}} <- Sheets.delete_sheet(sheet) do
      send_resp(conn, :no_content, "")
    end
  end
end
