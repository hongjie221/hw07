defmodule Timesheets.Sheets.Sheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sheets" do
    field :date, :date
    field :status, :boolean, default: false
    belongs_to :worker, Timesheets.Workers.Worker
    has_many :tasks, Timesheets.Tasks.Task
    timestamps()
  end

  @doc false
  def changeset(sheet, attrs) do
    sheet
    |> cast(attrs, [:status, :worker_id, :date])
    |> validate_required([:status, :date])
    |> unique_constraint(:worker_id, name: :worker_id_sheet_date_index)
  end
end
