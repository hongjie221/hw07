defmodule TimesheetsWeb.SheetView do
  use TimesheetsWeb, :view
  alias TimesheetsWeb.SheetView

  def render("index.json", %{sheets: sheets}) do
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("show.json", %{current_worker_id: current_worker_id}) do
    sheets_id = Timesheets.Sheets.get_all_sheet_id_by_worker_id(current_worker_id)
    sheets = Enum.map(sheets_id, fn x -> Timesheets.Sheets.get_sheet!(x) end)
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("sheet_show.json", %{current_worker_id: current_worker_id}) do
    sheets = Timesheets.Sheets.get_all_sheet_id_by_worker_id(current_worker_id)
  end

  def render("sheet.json", %{sheet: sheet}) do
    #[{jobcode, hour, desc}] = Timesheets.Tasks.get_task_by_sheet_id(sheet.id)
    #IO.insepect(jobcode)
    task = Timesheets.Tasks.get_task_by_sheet_id(sheet.id)
    job_code = Enum.map(task , fn{x, _, _} -> x end)
    hour = Enum.map(task, fn{_, y, _} -> y end)
    note = Enum.map(task, fn{_, _, z} -> z end)
    %{id: sheet.id,
      worker_id: Timesheets.Workers.get_worker_name_by_id(sheet.worker_id),
      status: sheet.status,
      date: sheet.date,
      job_code: job_code,
      hour: hour,
      note: note
    }
  end
  def render("show.json", %{id: id}) do
    sheets_id = Timesheets.Sheets.get_all_sheet_id_by_worker_id(id)
    sheets = Enum.map(sheets_id, fn x -> Timesheets.Sheets.get_sheet!(x) end)
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("edit.json", %{id: id}) do
    worker_list = Timesheets.Workers.get_workers_by_manager_id(id)
    sheet_list = Enum.map(worker_list, fn x ->
      Timesheets.Sheets.get_all_sheet_id_by_worker_id(x) end)
    sheet_lists = Enum.at(sheet_list, 0)
    sheets = Enum.map(sheet_lists, fn x -> Timesheets.Sheets.get_sheet!(x) end)
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

  def render("error.json", %{msg: msg}) do
    %{data: %{error: msg, id: [], worker_id: [], status: [],
    date: [], job_code: [], hour: [], note: []}}
  end

  def render("approve.json", %{manager_id: manager_id, id: id}) do
    Timesheets.Sheets.change_sheet_status_by_id(id)
    all_task = Timesheets.Tasks.get_task_by_sheet_id(id)
    Enum.map(all_task, fn {x, y, _} -> {
      Timesheets.Jobs.substract_budget_by_job_code(x, y)
    }
    end
    )
    worker_list = Timesheets.Workers.get_workers_by_manager_id(manager_id)
    sheet_list = Enum.map(worker_list, fn x ->
      Timesheets.Sheets.get_all_sheet_id_by_worker_id(x) end)
    sheet_lists = Enum.at(sheet_list, 0)
    sheets = Enum.map(sheet_lists, fn x -> Timesheets.Sheets.get_sheet!(x) end)
    %{data: render_many(sheets, SheetView, "sheet.json")}
  end

end
