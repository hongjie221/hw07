defmodule Timesheets.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :hours, :integer
    field :note, :string
    belongs_to :job, Timesheets.Jobs.Job
    belongs_to :sheet, Timesheets.Sheets.Sheet
    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:hours, :note, :job_id, :sheet_id])
    |> validate_required([:hours, :note])
  end
end
