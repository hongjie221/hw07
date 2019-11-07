defmodule TimesheetsWeb.SheetView do
  use TimesheetsWeb, :view
  alias TimesheetsWeb.SheetView

  def render("index.json", %{sheets: sheets}) do
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("show.json", %{current_worker_id: current_worker_id}) do
    sheets_id = Timesheets.Sheets.get_all_sheet_id_by_worker_id(current_worker_id)
    IO.inspect(sheets_id)
    sheets = Enum.map(sheets_id, fn x -> Timesheets.Sheets.get_sheet!(x) end)
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("sheet_show.json", %{current_worker_id: current_worker_id}) do
    sheets = Timesheets.Sheets.get_all_sheet_id_by_worker_id(current_worker_id)
    IO.inspect(sheets)
  end

  def render("sheet.json", %{sheet: sheet}) do
    %{id: sheet.id,
      worker_id: sheet.worker_id,
      status: sheet.status,
      date: sheet.date}
  end
end
