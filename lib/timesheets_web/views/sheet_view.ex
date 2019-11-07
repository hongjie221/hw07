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
    #[{jobcode, hour, desc}] = Timesheets.Tasks.get_task_by_sheet_id(sheet.id)
    #IO.insepect(jobcode)
    task = Timesheets.Tasks.get_task_by_sheet_id(sheet.id)
    job_code = Enum.map(task , fn{x, _, _} -> x end)
    hour = Enum.map(task, fn{_, y, _} -> y end)
    desc = Enum.map(task, fn{_, _, z} -> z end)
    IO.inspect(job_code)
    IO.inspect(hour)
    IO.inspect(desc)
    %{id: sheet.id,
      worker_id: sheet.worker_id,
      status: sheet.status,
      date: sheet.date,
      job_code: job_code,
      hour: hour,
      desc: desc
    }
  end
  def render("show.json", %{id: id}) do
    sheets_id = Timesheets.Sheets.get_all_sheet_id_by_worker_id(id)
    IO.inspect(sheets_id)
    sheets = Enum.map(sheets_id, fn x -> Timesheets.Sheets.get_sheet!(x) end)
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

end
