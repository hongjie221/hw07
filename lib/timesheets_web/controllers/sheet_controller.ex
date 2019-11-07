defmodule TimesheetsWeb.SheetController do
  use TimesheetsWeb, :controller

  alias Timesheets.Sheets
  alias Timesheets.Sheets.Sheet

  action_fallback TimesheetsWeb.FallbackController

  def index(conn, _params) do
    sheets = Sheets.list_sheets()
    render(conn, "index.json", sheets: sheets)
  end

  def create(conn, %{"job_code" => job_code, "hour" => hour, "description" => description}) do
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
    if total === 8 do

    else

    end
  end

  def show(conn, %{"id" => id}) do
    sheet = Sheets.get_sheet!(id)
    render(conn, "show.json", sheet: sheet)
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
